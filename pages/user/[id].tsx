import Head from 'next/head'
import styles from '../../styles/User.module.css'

export default function User({ user }) {
    return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>{user ? `User: ${user.userInfo.username}` : `User:`}</title>
                </Head>
                <h1>{user ? `User ID: ${user.userInfo.scoresaberid}` : ``}</h1>
                <p>{user ? `${user.userInfo.username}` : ``}</p>
                <picture>
                    <img alt="PFP" src={user ? `${user.userInfo.image}` : `https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png`} />
                </picture>
            </div>
        </>
    )
}

export async function getServerSideProps({ params }) {
    //Get user from local /api/users/[id]/simple.tsx
    //Enable caching
    const res = await fetch(`http://localhost:3000/api/users/${params.id}/full`, {
        headers: {
            'Cache-Control': 's-maxage=1, stale-while-revalidate'
        }
    })
    const user = await res.json();

    return {
        props: {
            user,
        }
    }

}