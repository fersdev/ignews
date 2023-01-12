import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from "next-auth/react"

import styles from './style.module.scss'
import Image from 'next/image'

export function SignInButton() {
    const { data: session, status } = useSession()

    return session ? (
        <button 
        type="button"
        className={styles.signInButton}
        onClick={() => signOut()}
        >
            <Image src={session.user.image} alt={session.user.name} className={styles.avatar} width="35" height="35"/> 
            <span>{ session.user.name }</span>
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button 
        type="button"
        className={styles.signInButton}
        onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417"/>
            Sign in with Github
        </button>
    );
}