import { iLesson, Menu, iPosition } from './components/LayOut/Menu'
import { NavBar, NavbarItem } from './components/LayOut/NavBar'
import { iRecordings } from './components/Forum/Recordings'
import { iDoubt, iForum } from './components/Forum/Forum'
import { iPost } from './components/Forum/Posts'

import { Recordings, Forum, Posts, Units } from './data/data'
import { iPlanet } from './components/Astral/AstralChart'
import { iLoginInput } from './components/Auth/Login'
import { iNewUser } from './components/Auth/SignUp'
import { Home } from './components/Home'

import { App as RealmApp, Credentials } from 'realm-web'
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react'

import 'bulma/css/bulma.css'
import axios from 'axios'
import './App.css'


export interface iNatalChart { planets:iPlanet[], houses:number[] }
export type Sign = 'Ari' | 'Tau' | 'Gem' | 'Can' | 'Leo' | 'Vir' | 'Lib' | 'Sco' | 'Sag' | 'Cap' | 'Aqu' | 'Pis' 
export interface iUser { 
    date:Date
    sign?:Sign
    name:string
    email:string
    user_id:string
    location:string
    current:iPosition
    progress:iPosition
    quizFailures:number
    natalChart:iNatalChart
}

const mapSign = (sun:iPlanet):Sign => {
    const signs:Sign[] = ['Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis' ]
    const sign = signs[sun.house - 1]
    return sign
}


interface iHomeData { forum?:iForum, recordings?:iRecordings, posts?:iPost[], lesson:iLesson}
const initialData:iHomeData = { 
    forum:undefined, 
    recordings:undefined, 
    posts:undefined,
    lesson:Units[0].modules[0].lessons[0] 
}



export const App = () => {
    const [ homeData, setHomeData ] = useState<iHomeData>(initialData)
    const largeScreen = useMediaQuery({ query: '(min-width: 1200px)' })

    const [ isLogin, setLogin ] = useState(false)
    const [ isWelcome, setWelcome ] = useState(true)

    const [ user, setUser ] = useState<iUser>()
    const [ db, setDB ] = useState<Realm.Services.MongoDBDatabase>()
    const [ app, setApp ] = useState<RealmApp<Realm.DefaultFunctionsFactory, any>>()

    const [ posts, setPosts ] = useState(Posts)
    const [ forum, setForum ] = useState(Forum)
    const [ recordings, setRecordings ] = useState(Recordings)


    useEffect(() => { 
        const connectMongo = async() => {
            const REALM_APP_ID = process.env.REACT_APP_REALM_ID as string
            const app = new RealmApp({ id: REALM_APP_ID })
            setApp(app)

            await app.currentUser?.refreshCustomData()
            if(!app.currentUser?.customData.current) return

            const mongo = app.currentUser.mongoClient('mongodb-atlas')
            const db = mongo.db('Cicero') 
            setDB(db)

            const user = await db.collection('users').findOne({ user_id:app.currentUser.id })
            setUser(user)
        }

        connectMongo()
    }, [])


    /**************************        Auth            ***************************/
    const createUser = async({ name, email, password, date, location }:iNewUser) => {
        if(!app) return

        try{
            await app.emailPasswordAuth.registerUser(email, password)
            await app.logIn(Credentials.emailPassword(email, password))    
        } catch(e){ return } // TODO: Handle on UI

        if(!app.currentUser) return
        const { id:user_id } = app.currentUser

        const mongo = app.currentUser.mongoClient('mongodb-atlas')
        const db = mongo.db('Cicero')
        setDB(db)

        const current: iPosition = { unit:0, module:0, lesson:0 }
        const progress: iPosition = {unit:3, module:0, lesson:5}
        const natalChart = {planets:[], houses:[]}
        const user:iUser = { user_id, name, email, date, location, quizFailures:0, current, progress, natalChart }
        setUser(user)

        await db.collection('users').insertOne(user)        
        const chartParams = `?query="${location}"&year=${date.getFullYear()}&month=${
            date.getMonth() + 1}&day=${date.getDate()}&hour=${date.getHours()}&minute=${date.getMinutes()
        }`

        const { data: { houses, planets } } =  await axios.get(`/.netlify/functions/astro-chart${chartParams}`)
        console.log(houses, planets)

        const sun = planets.find(({name}:{name:string}) => name === 'Sun')
        const sign = mapSign(sun)
        const fullUser = {...user, sign, natalChart:{planets, houses}}
        setUser(fullUser)

        db.collection('users').updateOne({ user_id }, {...fullUser, user_id})
    } 

    const updateUser = (user:iUser) => {
        if(!app?.currentUser || !db) return

        setUser(user)
        db.collection('users').updateOne({ user_id:app.currentUser.id }, {...user, user_id:app.currentUser.id})
    } 

    const login = async({ email, password }:iLoginInput) => {
        if(!app) return
        await app.logIn(Credentials.emailPassword(email, password))

        await app.currentUser?.refreshCustomData()
        if(!app.currentUser?.customData.current) return

        const mongo = app.currentUser.mongoClient('mongodb-atlas')
        const db = mongo.db('Cicero')
        setDB(db)

        const user = await db.collection('users').findOne({ user_id:app.currentUser.id })
        setUser(user)
    }


    /*******************        Navigation            *******************/
    const clickNavbar = async(item:NavbarItem) => {
        if(item === 'Home') reset()
        if (item === 'Login') return setLogin(true)
        if(!db) return

        if (item === 'Forum') {
            setHomeData({...homeData, forum, recordings:undefined, posts:undefined })
            const doubts = await db.collection('doubts').find({})
            const fetchedForum = {...Forum, questions:doubts.sort(() => -1)}

            setForum(fetchedForum)
            return setHomeData({...homeData, forum:fetchedForum, recordings:undefined, posts:undefined })

        } else if (item === 'Recordings'){ 
            setHomeData({...homeData, forum:undefined, recordings, posts:undefined})

            const records = await db.collection('recordings').find({})
            const fetchedRecordings = {...Recordings, recordings:records.sort(() => -1)}
            setRecordings(fetchedRecordings)
            return setHomeData({...homeData, forum:undefined, recordings:fetchedRecordings, posts:undefined})

        } else if (item === 'Posts') {   
            setHomeData({...homeData, forum:undefined, recordings:undefined, posts})

            const fetchedPosts = await db.collection('posts').find({})
            setPosts(fetchedPosts.sort(() => -1))
            return setHomeData({...homeData, forum:undefined, recordings:undefined, posts:fetchedPosts})
        }

    }

    const reset = () => {
        setLogin(false)
        setWelcome(true)
        setHomeData({...homeData, forum:undefined, recordings:undefined, posts:undefined})
    }
    
    const nextLesson = ({unit, module, lesson}:iPosition):iPosition => {
        if(!user) return { unit:0, module:0, lesson: 0}

        const hasNextLesson = Units[unit].modules[module].lessons[lesson+1]
        const hasNextModule = Units[unit].modules[user.current.module + 1]
        const hasNextUnit = Units[user.current.unit + 1]

        if (hasNextLesson) return { unit, module, lesson:lesson+1 }
        else if (hasNextModule) return { unit, module:module+1, lesson:0 }
        else if (hasNextUnit) return { unit, module:module+1, lesson:0 }
        else return { unit, module, lesson }
    }

    const next = () => {
        if(!user) return

        const { current } = user 
        const lesson = Units[current.unit].modules[current.module].lessons[current.lesson]

        if(lesson.type === 'Quiz'){
            if(user.quizFailures === 0) return updateUser({...user, current:nextLesson(current)})
            if(user.quizFailures === 1) return
            if(user.quizFailures === 2) return updateUser({
                ...user, 
                quizFailures:0, 
                progress:{...current, lesson:0}, 
                current: {...current, lesson:0}
            })

        } else updateUser({...user, current:nextLesson(current)})
    }

    const navigate = ({unit, module, lesson}:iPosition) => {
        if(!user) return
        if(unit > user.progress.unit) return
        if(unit === user.progress.unit && module > user.progress.module) return
        if(unit === user.progress.unit && module === user.progress.module && lesson > user.progress.lesson) return

        updateUser({...user, current:{ unit, module, lesson } })
        setHomeData({...homeData, recordings:undefined, forum:undefined, posts:undefined})
    }

    const approveQuiz = (score:number) => {
        if(!user) return

        const { current, progress } = user 
        const lesson = Units[current.unit].modules[current.module].lessons[current.lesson]
        if(!lesson.questions?.length) return false 

        const minScore = lesson.min || lesson.questions.length*.7
        const needsApproval = progress.lesson === current.lesson && progress.module === current.module

        if(needsApproval && score >= minScore) updateUser({...user, progress:nextLesson(progress), quizFailures:0})
        else if(needsApproval && user.quizFailures === 1) updateUser({...user, quizFailures:2 })
        else if(needsApproval) updateUser({...user, quizFailures:1})
        
        if(score >= minScore) return true
        else return false
    }

    const approve = (score?:number) => {
        if(!user) return

        const { current, progress } = user 
        const lesson = Units[current.unit].modules[current.module].lessons[current.lesson]
        if(lesson.type === 'Quiz' && score !== undefined) return approveQuiz(score)

        if(current.unit !== progress.unit) return
        if(current.module !== progress.module) return
        if(current.lesson !== progress.lesson) return
        return updateUser({...user, progress:nextLesson(progress)})
    }


    /*******************        DB Methods            *******************/
    const submit = (doubt:iDoubt) => {
        const questions:iDoubt[] = [{...doubt, likes:[user?.user_id as string]}, ...forum.questions]

        setForum({...forum, questions})
        setHomeData({...homeData, forum:{...forum, questions}})

        db?.collection('doubts').insertOne(doubt)
    }

    const like = (id:number) => {
        if(!user) return

        const liked = forum.questions[id]
        const question:iDoubt = !liked.likes.includes(user?.user_id) 
            ?   {...liked, likes: [...liked.likes, user?.user_id]}
            :   {...liked, likes: liked.likes.filter((like) => like !== user?.user_id)}

        const questions = forum.questions.map((q, i) => id === i ? question  : q)

        setForum({...forum, questions})
        setHomeData({...homeData, forum:{...forum, questions}})

        db?.collection('doubts').updateOne({_id:question._id}, {...question})
    }

    const post = (newPost:iPost) => {
        if(!user) return 
        const newPosts:iPost[] = [...posts, {...newPost, name:user.name, image:user.sign }]
 
        setPosts(newPosts)
        setHomeData({...homeData, posts:newPosts})
 
        db?.collection('posts').insertOne(post)
    }

    const likePost = (id:string) => {
        const likedPosts = posts.map((post, i) => 
            id === String(i) 
            // ? {...post, likes: post.likes + 1 } 
            ? {...post, likes: [] } 
            : post
        )

        setPosts(likedPosts)
        setHomeData({...homeData, posts:likedPosts})
 
        // db?.collection('posts').inse(post)
    }

    const reply = (comment:string, id:string) => {
        if(!user) return 

        const repliedPosts = posts.map((post, i) => 
            id === String(i) 
            ?   {...post, comments:[...post.comments, {comment, name:user.name, image:user.sign }]} 
            :   post
        )

        setPosts(repliedPosts)
        setHomeData({...homeData, posts:repliedPosts})
 
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
                            units={Units}
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
                        setWelcome={() => setWelcome(false)}
                        createUser={createUser}
                        likePost={likePost}
                        approve={approve} 
                        submit={submit}
                        login={login} 
                        reply={reply}
                        post={post}
                        like={like}
                        next={next}
                    />
                </div>
            </div>
        </div>
    </div>
}
