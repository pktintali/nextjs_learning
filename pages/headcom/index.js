import Head from 'next/head'
function HeadCom(){
    return (
        <>
          <Head>
              <title>My Page title</title>
              <meta name = 'description' content = 'My page description'/>
              <link rel ='icon' href = '/favicon.ico'/>
          </Head>
          <h2 className='text-3xl text-blue-700 text-center'>Head Component Example</h2>
        </>
    )
}
export default HeadCom;