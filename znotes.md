# NextJs Notes for Quick revision

## File Based Routing
In NextJs we can create file and the name of file is used as route. For file `home.js` route will be
```js
http://localhost:3000/home
```

`index.js` is used for loading base root.

## Nested Routing
For nested routing we can create folders and sub folders and files.
```dir
-home  
    -post
        -post1.js
        -post2.js
        -post3.js
        -index.js
```

For above pages route will be   
`http://localhost:3000/home/post1`   
`http://localhost:3000/home/post2`

If we will go on `http://localhost:3000/home` index.js file will load.

## Dynamic routing with id
We can create file name with `[]` to dynamically routing. like `home/[id].js` will load all the pages like `home/1`, `home/2`, `home/article1` etc.   

## Loading pages within page like docs (Catch all route)
We can also create documentation like page. Just name the file inside `[]` like `[...name]`.


Add three dots inside square brackets to create a catch all route. Helpful when you want different URLs for the same page layout or even when you are working with pages where some of the route parameters are optional. 
```js
import { useRouter } from 'next/router'
function Doc() {
    const router = useRouter()
    const { params = [] } = router.query
    console.log(params)
    if (params.length === 2) {
        return <h1>Viewing docs for feature {params[0]} and concept {params[1]}</h1>
    } else if (params.length === 1) {
        return <h1>Viewing docs for feature {params[0]}</h1>
    }
    return <h1>Docs Home Page</h1>
}
export default Doc
```

## Link component
We can use `Link` component to navigate on click of an statement.

## Navigate programmatically
`useRouter` hook's router.push method to navigate programmatically.

## Creating Custom 404 Page
We can create `404.js` file inside pages to create custom 404 page.

## Components vs Pages
Create page only when you need some route and some main screen otherwise for UI elements create components

## getStaticProps
Fot fetching api use `getStaticProps` within the page.  and user result as a props on the page function.   
- get static props runs only on the server side
- The function will never run client-side
- The code you write inside getStaticProps won't even be included in the JS bundle that is sent to the browser.
- You can write server-side code directly in getStaticProps
- You also don't have to worry about including API keys in the getStaticProps as that won't make it to the browser
- **getStaticProps is allowed only in a page and cannot be run from a regular component file**
- It is used only for pre-rendering and not for client side data fetching.
- getStaticProps should return an object and object contain a props key which is an object.
- getStaticProps will run at build time
- during development getStaticProps run on every request.

## Link Pre-fetching
- Any <Link> component in the viewport (initially or through scroll) will be pre fetched by default (including the corresponding data) for pages using Static Generation.

- When a page with getStaticProps is pre-rendered at the build time, in addition to the page HTML file, Next.js generates a JSON file holding the result of running getStaticProps. 

- The JSON file will be used in client-side routing through next/link, or next/router

- When you navigate to a page that's pre-rendered using getStaticProps, Next.js fetches the JSON file (pre-computed at build time) and uses it as the props to create the page component client-side.
- Client side page transition will not call getStaticProps as only the exported JSON is used.


### Notes
- Static generation is a method for pre-rendering where the HTML pages are generated at build time.
- It can be done with and without external data
- Export getStaticProps function for external data
- HTML, Javascript and a JSON file are generated
- **If you navigate directly to the page route, the HTML file is served**
- **If you navigate to the route from a different route, the page is created client side using the JavaScript and JSON pre fetched from the server.**