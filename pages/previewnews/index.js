function PreviewNews({ data }) {
    return <h1 className='content'>{data}</h1>
}

export default PreviewNews

export async function getStaticProps(context) {
    console.log('Running getStaticProps',context.previewData)
    return {
        props: {
            data: context.preview ? 'List of draft news' : 'List of published news'
        }
    }
}