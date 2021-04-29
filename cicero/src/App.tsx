import { iLesson, Menu, iPosition } from './components/LayOut/Menu'
import { NavBar, NavbarItem } from './components/LayOut/NavBar'
import { iRecordings } from './components/Forum/Recordings'
import { iDoubt, iForum } from './components/Forum/Forum'
import { iLoginInput } from './components/Auth/Login'
import { Home } from './components/Home'

import { modules, Recordings, Forum, defaultUser } from './data/data'
import { App as RealmApp, User, Credentials } from 'realm-web'
import { useState, useEffect } from 'react'

import 'bulma/css/bulma.css'
import './App.css'


const connectMongo = async() => {
    const REALM_APP_ID = 'tasktracker-kjrie'
    const app = new RealmApp({ id: REALM_APP_ID })
    const user: User = await app.logIn(Credentials.anonymous())
    return user
}

export interface iUser { email:string, progress:iPosition, quizFailures:number, current:iPosition }
interface iHomeData { forum?:iForum, recordings?:iRecordings, lesson:iLesson}
const initialData:iHomeData = { 
    forum:undefined, 
    recordings:undefined, 
    lesson:modules[defaultUser.current.module].lessons[defaultUser.current.lesson] 
}

export const App = () => {
    const [ homeData, setHomeData ] = useState<iHomeData>(initialData)

    const [ db, setDB ] = useState<Realm.Services.MongoDBDatabase>()
    const [ mongoUser, setMongoUser ] = useState<User>()
    const [ user, setUser ] = useState<iUser>(defaultUser)

    const [ forum, setForum ] = useState(Forum)
    const [ isLogin, setLogin ] = useState(false)
    const [ recordings, setRecordings ] = useState(Recordings)


    useEffect(() => { 
        return
        connectMongo().then(mongoUser => {
            setMongoUser(mongoUser)
            const mongo = mongoUser.mongoClient('myAtlasCluster')
            const db = mongo.db('Cicero')
            setDB(db)
        }) 
    }, [])

    const updateUser = (user:iUser) => {
        setUser(user)
        setHomeData({...homeData, lesson:modules[user.current.module].lessons[user.current.lesson]})
        // db?.collection('users').updateOne({ email: user.email }, user)
    } 

    const clickNavbar = (item:NavbarItem) => {
        if(item === 'Forum') return setHomeData({...homeData, forum, recordings:undefined})
        if(item === 'Login') return setLogin(!isLogin)
        if(item === 'Recordings') return setHomeData({...homeData, forum:undefined, recordings})
        if(item === 'Home') return setLogin(false)
    }
    
    const login = async({ email, password }:iLoginInput) => {
        if(!db) return

        const collection = db.collection('users')
        const user = await collection.findOne({ email, password })
        updateUser(user)
        setLogin(false)

        const recordings = await db.collection('recordings').find({})
        setRecordings({...Recordings, recordings })

        const doubts = await db.collection('doubts').findOne({})
        setForum({...forum, questions:doubts})
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
            if(!user.current.lesson) return
            if(!user.current.lesson) return

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
    }

    const approveQuiz = (score:number) => {
        if(!user) return

        const lesson = modules[user.current.module].lessons[user.current.lesson]
        if(!lesson.questions?.length) return false 

        const minScore = lesson.min || lesson.questions.length*.7
        const isPassing = user.progress.lesson === user.current.lesson && user.progress.module === user.current.module

        if(isPassing && score >= minScore) updateUser({...user, progress:nextLesson(user.progress), quizFailures:0})
        else if(isPassing && user.quizFailures > 1) updateUser({...user, quizFailures:2 })
        else if(isPassing) updateUser({...user, quizFailures:1})
        
        if(score >= minScore) return true
        else return false
    }

    const approve = (score?:number) => {
        if(!user) return

        const lesson = modules[user.current.module].lessons[user.current.lesson]
        if(lesson.type === 'Quiz' && score) return approveQuiz(score)
        return updateUser({...user, progress:nextLesson(user.progress)})
    }

    const submit = (doubt:iDoubt) => {
        setForum({...forum, questions:[...forum.questions, doubt]})
        db?.collection('doubts').insertOne(doubt)
    }


    return <div>
        <NavBar user={user} click={(item) => clickNavbar(item)}/>
        <div className="container" style={{maxWidth:'100%'}}>
            <div className="columns" style={{margin:0}}>
                <Menu modules={modules} navigate={navigate} user={user}/>

                <div 
                    className="column is-10" 
                    style={{ 
                        padding:'3rem', 
                        marginLeft:3, 
                        marginRight:0, 
                        margin:'0px auto', 
                        backgroundColor: 'aliceblue', 
                        width: 'calc(100vw - 253px)',
                        textAlign:'center'
                    }}
                >
                    <Home 
                        user={user}
                        {...homeData} 
                        isLogin={isLogin} 
                        mongoUser={mongoUser}
                        approve={approve} 
                        submit={submit}
                        login={login} 
                        next={next} 
                    />
                </div>
            </div>
        </div>
    </div>
}
