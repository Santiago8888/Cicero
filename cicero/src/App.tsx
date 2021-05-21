import { modules, Recordings, Forum, Posts, defaultUser } from './data/data'
import { iLesson, Menu, iPosition } from './components/LayOut/Menu'
import { NavBar, NavbarItem } from './components/LayOut/NavBar'
import { iRecordings } from './components/Forum/Recordings'
import { iDoubt, iForum } from './components/Forum/Forum'
import { iPost } from './components/Forum/Posts'

import { iLoginInput } from './components/Auth/Login'
import { Home } from './components/Home'


import { App as RealmApp, User, Credentials } from 'realm-web'
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react'

import 'bulma/css/bulma.css'
import './App.css'


const connectMongo = async() => {
    const REALM_APP_ID = process.env.REACT_APP_REALM_ID as string
    const app = new RealmApp({ id: REALM_APP_ID })
    const user: User = await app.logIn(Credentials.anonymous())
    return user
}

export interface iUser { email:string, progress:iPosition, quizFailures:number, current:iPosition }

interface iHomeData { forum?:iForum, recordings?:iRecordings, posts?:iPost[], lesson:iLesson}

const initialData:iHomeData = { 
    forum:undefined, 
    recordings:undefined, 
    posts:undefined,
    lesson:modules[0].lessons[0] 
}



export const App = () => {
    const [ homeData, setHomeData ] = useState<iHomeData>(initialData)
    const largeScreen = useMediaQuery({ query: '(min-width: 1200px)' })

    const [ db, setDB ] = useState<Realm.Services.MongoDBDatabase>()
    const [ mongoUser, setMongoUser ] = useState<User>()
    const [ user, setUser ] = useState<iUser>(defaultUser)

    const [ forum, setForum ] = useState(Forum)
    const [ isLogin, setLogin ] = useState(false)
    const [ isWelcome, setWelcome ] = useState(true)
    const [ recordings, setRecordings ] = useState(Recordings)
    const [ posts, setPosts ] = useState(Posts)


    useEffect(() => { 
        return 
        connectMongo().then(mongoUser => {
            setMongoUser(mongoUser)
            const mongo = mongoUser.mongoClient('mongodb-atlas')
            const db = mongo.db('Cicero')
            setDB(db)
        }) 
    }, [])


    const createUser = (loginInput:iLoginInput) => {
        if(!db) return

        const startingPosition: iPosition = { module:0, lesson:0 }
        const newUser: iUser = { 
            ...loginInput, 
            current:startingPosition, 
            progress:startingPosition , 
            quizFailures:0
        }

        db.collection('users').insertOne(newUser)
        setUser(newUser)
    } 

    const updateUser = (user:iUser) => {
        setUser(user)
        db?.collection('users').updateOne({ email: user.email }, user)
    } 

    const clickNavbar = (item:NavbarItem) => {
        if (item === 'Login') return setLogin(true)

        if (item === 'Forum') return setHomeData({...homeData, forum, recordings:undefined, posts:undefined })
        if (item === 'Recordings') return setHomeData({...homeData, forum:undefined, recordings, posts:undefined})
        if (item === 'Posts') return setHomeData({...homeData, forum:undefined, recordings:undefined, posts})

        if(item === 'Home') reset()
    }

    const reset = () => {
        setLogin(false)
        setWelcome(true)
        setHomeData({...homeData, forum:undefined, recordings:undefined, posts:undefined})
    }
    
    const login = async({ email, password }:iLoginInput) => {
        if(!db) return

        const collection = db.collection('users')
        const user = await collection.findOne({ email, password })

        if(!user) return
        updateUser(user)
        setLogin(false)

        const recordings = await db.collection('recordings').find({})
        setRecordings({...Recordings, recordings:recordings.sort(() => -1 )})

        const doubts = await db.collection('doubts').find({})
        setForum({...forum, questions:doubts.sort((a,b) => -1 )})

        // TODO: Fetch Posts.
        setPosts([])
    }

    const nextLesson = ({module, lesson}:iPosition):iPosition => {
        if(!user) return { module:0, lesson: 0}
        if (modules[module].lessons[lesson+1]) return { module:module, lesson:lesson+1 }
        else if (modules[user.current.module + 1]) return { module: module+1, lesson:0 }
        else return { module, lesson }
    }

    const next = () => {
        if(!user) return

        const lesson = modules[user.current.module].lessons[user.current.lesson]
        if(lesson.type === 'Quiz'){
            if(user.quizFailures === 0) return updateUser({...user, current:nextLesson(user.current)})
            if(user.quizFailures === 1) return
            if(user.quizFailures === 2) return updateUser({
                ...user, 
                quizFailures:0, 
                progress:{...user.current, lesson:0}, 
                current: {...user.current, lesson:0}
            })

        } else updateUser({...user, current:nextLesson(user.current)})
    }

    const navigate = ({module, lesson}:iPosition) => {
        if(!user) return
        if(module > user.progress.module) return
        if(module === user.progress.module && lesson > user.progress.lesson) return

        updateUser({...user, current:{ module, lesson } })
        setHomeData({...homeData, recordings:undefined, forum:undefined, posts:undefined})
    }

    const approveQuiz = (score:number) => {
        if(!user) return

        const lesson = modules[user.current.module].lessons[user.current.lesson]
        if(!lesson.questions?.length) return false 

        const minScore = lesson.min || lesson.questions.length*.7
        const needsApproval = user.progress.lesson === user.current.lesson && user.progress.module === user.current.module

        if(needsApproval && score >= minScore) updateUser({...user, progress:nextLesson(user.progress), quizFailures:0})
        else if(needsApproval && user.quizFailures === 1) updateUser({...user, quizFailures:2 })
        else if(needsApproval) updateUser({...user, quizFailures:1})
        
        if(score >= minScore) return true
        else return false
    }

    const approve = (score?:number) => {
        if(!user) return

        const lesson = modules[user.current.module].lessons[user.current.lesson]
        if(lesson.type === 'Quiz' && score !== undefined) return approveQuiz(score)
        return updateUser({...user, progress:nextLesson(user.progress)})
    }

    const submit = (doubt:iDoubt) => {
        const questions = [doubt, ...forum.questions]

        setForum({...forum, questions})
        setHomeData({...homeData, forum:{...forum, questions}})

        db?.collection('doubts').insertOne(doubt)
    }

    const post = (newPost:iPost) => {
        const newPosts = [...posts, newPost]
 
        setPosts(newPosts)
        setHomeData({...homeData, posts:newPosts})
 
        db?.collection('posts').insertOne(post)
    }

    const likePost = (id:string) => {
        const likedPosts = posts.map((post, i) => 
            id === String(i) 
            ? {...post, likes:post.likes ? post.likes + 1: 1 || 1} 
            : post
        )

        setPosts(likedPosts)
        setHomeData({...homeData, posts:likedPosts})
 
        // db?.collection('posts').inse(post)
    }

    return <div>
        <NavBar user={user} click={(item) => clickNavbar(item)}/>
        <div className="container" style={{maxWidth:'100%'}}>
            <div className="columns" style={{margin:0}}>
                {
                    largeScreen &&
                        <Menu
                            user={user}
                            modules={modules}
                            navigate={navigate}
                            {...homeData}
                        />
                }

                <div 
                    className="column is-10" 
                    style={{ 
                        paddingTop:'3rem', 
                        marginLeft:3, 
                        marginRight:0, 
                        margin:'0px auto', 
                        backgroundColor: 'aliceblue', 
                        width: largeScreen ? 'calc(100vw - 253px)' : '100%',
                        minHeight:'calc(100vh - 82px)',
                        textAlign:'center'
                    }}
                >
                    <Home 
                        user={user}
                        {...homeData} 
                        isLogin={isLogin} 
                        isWelcome={isWelcome}
                        mongoUser={mongoUser}
                        lesson={modules[user?.current.module || 0].lessons[user?.current.lesson || 0]}
                        setWelcome={() => setWelcome(false)}
                        createUser={createUser}
                        likePost={likePost}
                        approve={approve} 
                        reply={() => {}}
                        submit={submit}
                        login={login} 
                        post={post}
                        next={next}
                    />
                </div>
            </div>
        </div>
    </div>
}
