import {GetStaticProps} from 'next';
import Head from 'next/head';
import styles from './styles.module.scss';

import Link from 'next/link';

import * as Prismic from '@prismicio/client'
import {RichText} from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';


type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
};

interface PostProps {
    posts: Post[]
}

export default function Posts({ posts }: PostProps) {
    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    { posts.map(post => (
                        <>
                        <time>{post.updatedAt}</time>
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                        <strong>{post.title}</strong>
                        </Link>
                        <p>{post.excerpt}</p>
                        </>
                    ))}
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();


    const response = await prismic.get({
        predicates: Prismic.predicate.at('document.type', 'post'),
        lang: 'pt-br',
    })

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

  return {
    props: { posts }
  }
}

