import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../styles/User.module.css'

export default function User({ user }) {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>{user ? `User: ${user.playerInfo.playerName}` : `User:`}</title>
                </Head>
                <h1>{user ? `User ID: ${user.playerInfo.playerId}` : ``}</h1>
                <p>{user ? `${user.playerInfo.playerName}` : ``}</p>
                <picture>
                    <img alt="PFP" src={user ? `https://new.scoresaber.com${user.playerInfo.avatar}` : `https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png`} />
                </picture>
            </div>
        </>
    )
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://new.scoresaber.com/api/player/${params.id}/full`)
    const user = await res.json();

    return {
        props: {
            user,
        }
    }

}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}