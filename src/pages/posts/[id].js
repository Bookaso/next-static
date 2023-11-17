export default function Post({ post }) {
    return (
        <div>
            <h1>{post.slug}</h1>
            <p>{post.date}</p>
        </div>
    );
}

export async function getStaticPaths() {
    const res = await fetch(`https://samplewp1dev.wpenginepowered.com/index.php?rest_route=/wp/v2/posts`)
    const post = await res.json()

    const postIds = post.map((post) => post.id)

    const paths = postIds.map((id) => ({ params: { id: id.toString() } }))

    return {
        paths:[...paths],
        fallback:false
    }
}
export async function getStaticProps({ params }){
    const res = await fetch(`https://samplewp1dev.wpenginepowered.com/index.php?rest_route=/wp/v2/posts/${params.id}`)
    const post = await res.json()
  
    return {
      props: {
        post,
      },
    }
}
