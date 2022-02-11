import { iLesson, Menu, iPosition } from './components/LayOut/Menu'
import { NavBar, NavbarItem } from './components/LayOut/NavBar'
import { iRecordings } from './components/Forum/Recordings'
import { iDoubt, iForum } from './components/Forum/Forum'
import { iPost } from './components/Forum/Posts'

import { iPlanet } from './components/Astral/AstralChart'
import { Recordings, Forum, Units } from './data/data'
import { iLoginInput } from './components/Auth/Login'
import { Modal } from './components/Forum/Atoms'
import { maxProgress } from './utils/user'
import { Home } from './components/Home'

import { App as RealmApp, Credentials } from 'realm-web'
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react'
import amplitude from 'amplitude-js'

import 'bulma/css/bulma.css'
import './App.css'


export interface iNatalChart { planets:iPlanet[], houses:number[] }
export type Sign = 'Ari' | 'Tau' | 'Gem' | 'Can' | 'Leo' | 'Vir' | 'Lib' | 'Sco' | 'Sag' | 'Cap' | 'Aqu' | 'Pis' 
export interface iUser { 
    sign?:Sign
    name:string
    email:string
    user_id:string
    location:string
    current:iPosition
    progress:iPosition
    quizFailures:number
    natalChart:iNatalChart
    birth?:{
        day:number,
        month:number,
        year:number,
        hour:number,
        minute:number,
    },
    house?:number
}


export interface iHomeData { forum?:iForum, recordings?:iRecordings, posts?:iPost[], lesson:iLesson}
const initialData:iHomeData = { 
    forum:undefined, 
    recordings:undefined, 
    posts:undefined,
    lesson:Units[0].modules[0].lessons[0] 
}


export interface iApprove { score?:number, newPost?:iPost, doubt?:iDoubt }

export const App = () => {
    const [ homeData, setHomeData ] = useState<iHomeData>(initialData)
    const largeScreen = useMediaQuery({ query: '(min-width: 1200px)' })

    const [ isLogin, setLogin ] = useState(false)

    const [ user, setUser ] = useState<iUser>()
    const [ db, setDB ] = useState<Realm.Services.MongoDBDatabase>()
    const [ app, setApp ] = useState<RealmApp<Realm.DefaultFunctionsFactory, any>>()

    const [ posts, setPosts ] = useState<iPost[]>([])
    const [ forum, setForum ] = useState(Forum)
    const [ recordings, setRecordings ] = useState(Recordings)

    const defaultModal = { active:false, text:'', cta:'', title:'' }
    const [ modal, setModal ] = useState(defaultModal)


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

        try {
            amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_TOKEN as string)
            amplitude.getInstance().logEvent('VISIT_ASTRO')    
        } catch(e) { }
    }, [])


    /**************************        Auth            ***************************/
    const updateUser = async(user:iUser) => {
        if(!app?.currentUser || !db) return

        setUser(user)

        const { progress }:iUser = await db.collection('users').findOne({ user_id:app.currentUser.id })
        user.progress = maxProgress(user.progress, progress)

        db.collection('users').updateOne({ user_id:app.currentUser.id }, {...user, user_id:app.currentUser.id})
        setUser(user)

        try { amplitude.getInstance().logEvent('ASTRO_NAVIGATE', { ...user.current }) } catch(e) { }
    } 

    const login = async({ email, password }:iLoginInput) => {
        if(!app) return

        try {
            await app.logIn(Credentials.emailPassword(email, password))
            setModal({ active:true, text:'Iniciando Sesión...', cta:'Cerrar', title:'Bienvenid@' })

        } catch(e){ 
            setModal({
                active:true, 
                text:'Lo sentimos, usuario o contraseña incorrecta.', 
                cta:'Volver a intenar',
                title:'Error'
            })
            return 
        }

        if(!app.currentUser) return
        await app.currentUser.refreshCustomData()
        if(!app.currentUser.customData.current) return

        const mongo = app.currentUser.mongoClient('mongodb-atlas')
        const db = mongo.db('Cicero')
        setDB(db)

        const user = await db.collection('users').findOne({ user_id:app.currentUser.id })
        setUser(user)

        setModal(defaultModal)
    }


    /*******************        Navigation            *******************/
    const clickNavbar = async(item:NavbarItem) => {
        try { amplitude.getInstance().logEvent('ASTRO_CLICK', { tab:item }) } catch (e) { }

        if(item === 'Home') reset()
        if (item === 'Login') return setLogin(true)
        if(item === 'Back') return back()
        if(item === 'Next') return next()
        

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
        setHomeData({...homeData, forum:undefined, recordings:undefined, posts:undefined})
    }
    
    const nextLesson = ({unit, module, lesson}:iPosition):iPosition => {
        if(!user) return { unit:0, module:0, lesson: 0}

        const hasNextLesson = Units[unit].modules[module].lessons[lesson+1]
        const hasNextModule = Units[unit].modules[user.current.module + 1]
        const hasNextUnit = Units[user.current.unit + 1]

        if (hasNextLesson) return { unit, module, lesson:lesson+1 }
        else if (hasNextModule) return { unit, module:module+1, lesson:0 }
        else if (hasNextUnit) return { unit:unit+1, module:0, lesson:0 }
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
                progress:{...current, lesson:user.current.lesson-1}, 
                current: {...current, lesson:user.current.lesson-1}
            })

        } else updateUser({...user, current:nextLesson(current)})
    }

    const back = () => {
        if(!user) return
        const { current } = user 
        const previousLesson = {...current }

        if(current.lesson > 0) previousLesson.lesson -= 1 
        else if(current.module > 0) {
            previousLesson.module -= 1 
            previousLesson.lesson = Units[current.unit].modules[previousLesson.module].lessons.length - 1
        } else if(current.unit > 0) {
            previousLesson.unit -= 1
            previousLesson.module = Units[previousLesson.unit].modules.length - 1
            previousLesson.lesson = Units[previousLesson.unit].modules[previousLesson.module].lessons.length - 1
        } else return

        updateUser({...user, current:previousLesson })
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
        const needsApproval = progress.lesson === current.lesson && progress.module === current.module && progress.unit === current.unit

        if(needsApproval && score >= minScore) updateUser({...user, progress:nextLesson(progress), quizFailures:0})
        else if(needsApproval && user.quizFailures === 1) updateUser({...user, quizFailures:2 })
        else if(needsApproval) updateUser({...user, quizFailures:1})
        
        if(score >= minScore) return true
        else return false
    }

    const approve = ({score, newPost, doubt}:iApprove) => {
        if(!user) return

        const { current, progress } = user 
        const lesson = Units[current.unit].modules[current.module].lessons[current.lesson]
        if(lesson.type === 'Quiz' && score !== undefined) return approveQuiz(score)
        if(lesson.type === 'Reflection' && newPost !== undefined) return approveReflection(newPost)
        if(lesson.type === 'Reflection' && doubt !== undefined) return approveDoubt(doubt)

        if(current.unit !== progress.unit) return
        if(current.module !== progress.module) return
        if(current.lesson !== progress.lesson) return

        return updateUser({...user, progress:nextLesson(progress)})
    }

    const approveReflection = (newPost:iPost) => {
        post(newPost)
        if(!user) return

        const { current:c, progress:p } = user 
        const needsProgress = c.unit === p.unit && c.module === p.module && c.lesson === p.lesson
 
        return updateUser({
            ...user, 
            progress: needsProgress ? nextLesson(p) : p,
            current: nextLesson(c)
        })
    }

    const approveDoubt = (doubt:iDoubt) => {
        submit(doubt)
        if(!user) return

        const { current:c, progress:p } = user 
        const needsProgress = c.unit === p.unit && c.module === p.module && c.lesson === p.lesson
 
        return updateUser({
            ...user, 
            progress: needsProgress ? nextLesson(p) : p,
            current: nextLesson(c)
        })
    }


    /*******************        DB Methods            *******************/
    const submit = async(doubt:iDoubt) => {
        if(!user || !db) return

        const doubts = await db.collection('doubts').find({})
        const questions:iDoubt[] = [{...doubt, likes:[user.user_id as string]}, ...doubts.sort(() => -1)]

        setForum({...forum, questions})
        setHomeData({...homeData, forum:{...forum, questions}})

        db.collection('doubts').insertOne(doubt)
    }

    const like = (id:number) => {
        if(!user || !db) return

        const liked = forum.questions[id]
        const question:iDoubt = !liked.likes.includes(user.user_id) 
            ?   {...liked, likes: [...liked.likes, user.user_id]}
            :   {...liked, likes: liked.likes.filter((like) => like !== user.user_id)}

        const questions = forum.questions.map((q, i) => id === i ? question  : q)

        setForum({...forum, questions})
        setHomeData({...homeData, forum:{...forum, questions}})

        db.collection('doubts').updateOne({_id:question._id}, {...question})
    }


    const post = async(newPost:iPost) => {
        if(!user || !db) return 
        if(!homeData.posts) setHomeData({...homeData, posts:[]}) 

        db.collection('posts').insertOne(newPost)
        const newPosts = await db.collection('posts').find({})
        const sortedPosts = newPosts.sort(() => -1)
 
        setPosts(sortedPosts)
        setHomeData({...homeData, posts:sortedPosts}) 
    }

    const likePost = (id:number) => {
        if(!user || !db) return

        const post:iPost = !posts[id].likes.includes(user.user_id) 
            ?   {...posts[id], likes: [...posts[id].likes, user.user_id]}
            :   {...posts[id], likes: posts[id].likes.filter((like) => like !== user.user_id)}

        const updatedPosts = posts.map((p, i) => id === i ? post  : p)

        setPosts(updatedPosts)
        setHomeData({...homeData, posts:updatedPosts})

        db.collection('posts').updateOne({_id:post._id}, {...post})
    }

    const reply = (comment:string, id:number) => {
        if(!user || !db) return 

        
        const repliedPosts = posts.map((post, i) => 
            id === i 
            ?   {...post, comments:[...post.comments, {comment, name:user.name, image:user.sign }]} 
            :   post
        )

        setPosts(repliedPosts)
        setHomeData({...homeData, posts:repliedPosts})

        const post:iPost = {...posts[id], comments:[...posts[id].comments, {comment, name:user.name, image:user.sign }]} 
        db.collection('posts').updateOne({_id:post._id}, {...post})
    }

    return <div>
        <NavBar user={user} homeData={homeData} click={(item) => clickNavbar(item)}/>
        <div className='container' style={{maxWidth:'100%'}}>
            <div className='columns' style={{margin:0}}>
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
                    className='column is-10' 
                    style={{ 
                        paddingTop:largeScreen ? '3rem' : '1rem', 
                        marginLeft:3, 
                        marginRight:0, 
                        margin:'0px auto', 
                        backgroundColor: '#EEEEEE', 
                        width: largeScreen ? 'calc(100vw - 253px)' : '100%',
                        minHeight:'calc(100vh - 82px)',
                        textAlign:'center'
                    }}
                >
                    <Home 
                        user={user}
                        {...homeData} 
                        post={post}
                        like={like}
                        next={next}
                        login={login} 
                        reply={reply}
                        submit={submit}
                        approve={approve} 
                        isLogin={isLogin} 
                        likePost={likePost}
                        setLogin={() => setLogin(true)}
                    />
                </div>
            </div>
        </div>

        <Modal 
            title={modal.title} 
            isActive={modal.active} 
            cta={modal.cta}
            deactivate={() => setModal({...modal, active:false})} 
            submit={() => setModal({...modal, active:false})} 
        >
            <h3 style={{textAlign:'center', fontSize:'1.2rem', marginTop:20}}> 
                { modal.text }
            </h3>
        </Modal>
    </div>
}
