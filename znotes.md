# NextJs Notes for Quick revision
Next.js is full stack framework.  
You can write the Front End Code ans also write API that can be called by the front end code.

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

## getStaticPaths 
We use getStaticPaths whenever we have pre render dynamically generated pages.
For example we have to build page for `posts/1` to `posts/3` so we will use getStaticPaths to tell that we need 1 to 3 posts pre rendered.

```js
export async function getStaticPaths() {
    return {
        paths: [
            { params: { postId: '1' } },
            { params: { postId: '2' } },
            { params: { postId: '3' } },
        ],
        fallback: false
    }
}
```
Suppose when we have 100 posts then we are not gonna write 100 lines manually.
We can also create the paths programmatically

```js
export async function getStaticPaths() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()

    const paths = data.map(post => {
        return {
            params: {
                postId: post.id.toString()
            }
        }
    })
    
    return {
        paths,
        fallback: false
    }
}
```

## fallback Key in getStaticPaths
It is compulsory. It can hold three value.  
- false
- true
- blocking

## fallback: false
- The paths returned from the getStaticPaths will be **rendered to HTML** at **build time** by getStaticProps.
- Any paths not returned by getStaticPath  will result in a 404 page.

**when to use** `fallback:false`   
- If you have an application with a small number of paths to pre-render.
- When new pages are not added often.
- A blog site with a few article is a good example for fallback set to false

## fallback: true
- The paths returned from getStaticPaths will be rendered to html at build time by getStaticProps.
- The paths that have not been generated at build time **will not result in a 404 page**. Instead, Next.js will serve a "fallback"version of that page on the first request to such a path.
- In the background Next.js will statically generate the requested path HTML and JSON. This includes running getStaticProps.  
**Example -** We have defined paths only for post id 1,2 and 3. When we will visit posts/4 it will generate that page at that time and next time it will be used.

- When that's done, the browser receives the JSON for the generated path. this will be used to automatically render the page with the required props. From the user's perspective, the page will be swapped from the fallback page to the full page.
- At the same time Next.js keeps track of the new list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

**Note:** Fallback `true` means Next.js is generating the pages and json in the background, and props is not available. And `false` means pages and props are available.

**Note:** But what if we hit posts/n and n does not exist in the api. then we can check in the getStaticProps and return an object with 404.
```js
if(idDoesNotExist){
 return {
     notFound:true,
 }
}
```
This will generate 404 page in the browser.

**Note:** When we are using `fallback: true` and if are using link and list of posts then all the pages will be generated as you scroll down. Because Next.Js uses pre-rendering for `Link`.

**When to use** `fallback:true`
- If your app has a very large number of static pages that depends on the data.
- You want all the product to be pre-rendered but if you have a few thousand products, builds can take a really long time.
- You may **statically generate** a small subset of products that are **popular** and use **fallback:true** for the rest.
- When someone requests a page that's not generated yet, the user will see the page with a loading indicator.
- Shortly after, `getStaticProps` finishes and the page will be will be rendered with the requested data. From then onwards, everyone who requests the same page will get the statically pre-rendered page.
- This ensures that users always have a fast experience while preserving fast builds and the benefits of static generation.

## fallback: blocking
`fallback: blocking` is very similar to `fallback: true`. Only difference is that instead of showing a fallback page you will not see any new content in the UI while the page is being generated on server.

- The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
- The paths that have not been generated at build time will not result in a 404 page. Instead. on the first request, Next.js will render the page on the server and return the generated HTML.
- When that's done, the browser receives the HTML for the generated path. From user's perspective, it will transition from "the browser is requesting the page to" " the full page is loaded". There is no flash of loading/fallback state.
- At the same time Next.js keep track of the new pre-rendered pages. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

**When to use** `fallback:blocking`
- On a UX level, sometimes, people prefer the page to be loaded without a loading indictor if the wait time is a few millie seconds. This helps avoid the layout shifts.
- Some crawlers did not support javascript. The loading page would be rendered an then the full page would be loaded which was causing a problem.

## Static generation and Issues
- Static generation is a method of pre-rendering where the HTML pages are generated at build time.
- The pre-rendered static pages can be pushed to cdn, cached and served to clients across the globe almost instantly.
- Static content is fast and better for SEO as they are immediately indexed by search engines.
- Static generation with getStaticProps for data fetching and getStaticPaths for dynamic pages seems like a really good approach to a wide variety of applications in production.

**Issues with static site generation**
- The build time is proportional to the number of pages in the application.
- A page, once generated, can contain stale data till the time you rebuild the application.

**Issue with build time**  
When you have to build a very large site with 100,000 page. build time can take 2-3 hour of time.

**Issue with stale(fix/basi) data**  
Let say you decided to change to price of product then you have to rebuild the entire application.

## Incremental Static Regeneration (ISR)
There was a need to update only those pages which needed a change without having to rebuild the entire app.

With ISR Next.js allows you to update static pages after you have built your application.
Which means you can statically generate individual pages without needing to rebuild the entire site, effectively solving the issue of dealing with stale data.

**How to implement ?**  
In the getStaticProps function, apart from the props key, we can specify a `revalidate` key.
the value for revalidate is the number of seconds after which a page re-generation can occur.

```js
export async function getStaticProps() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    return {
        props: {
            posts: data,
        },
        revalidate: 10,
    }
}
```

`revalidate` will re-generate pages after every given seconds. Whenever anyone visit that page.

**Note:** when ever you will visit incremental pages after given time, the page will be re-generated but you will not see that changes at that time , because at that time only pages are build but you got the stale/old page. So next time you will see the changes.

**Note:** Also remember only requested pages will be regenerated. Suppose if we requested products list page then it will be re generated but the detail page will not be generated with updated data unless it has a link with products page.

- revalidation does not mean the page automatically re-generates every n seconds.
- The re-generation can also fail and the previously cached HTML could be served till the subsequent re-generation succeed.

## Problem with static generation
- with not able  to fetch data per request, we run into the problem of stale data.
- let's say news website
- We don't get access to the incoming request.
- let's say social media app
- we can't fetch user specific data

>Static generation end.

# Serer Side Rendering
- If it is possible and is not very necessary do not  use serer side rendering it's slower than static page generation as pages are generated and served at request time.
- Next.js allows us to pre-render a page not at build time but at request time.
- The HTML is generated for every incoming request.
- SSR is a form of pre-rendering where html is generated at request time.
- SSR is required when you need to fetch data per request and also when you need to personalized data keeping in mind SEO.

**How to Use** -  Just use `getServerSideProps` function like below nothing special.
```js
export async function getServerSideProps() {
    const response = await fetch('http://localhost:4000/news');
    const data = await response.json();
    return {
        props: {
            articles: data
        }
    }
}
```

- get serverSideProps runs only on the server side. The function will never run client side.
- The code you write inside getStaticProps won't even be included in the JS bundle that is sent to the browser.
- You can write server-side code directly in `getServerSideProps`
- Accessing the file system using the fs module and querying the database can be done inside `getServerSideProps`
- You don't have to worry about including API keys in `getServerSideProps` as that won't make it to the browser.
- `getSererSideProps` is allowed only in a page and can't be run in a regular component file.
- It is only used for pre-rendering not client data fetching.
- `getSererSideProps` should return an object and object should contain a props key which is an object.
- `getServerSideProps` will run at request time.

**Note:** We can use `context` as a parameter in `getServerSideProps` to get conditional data.

```js
export async function getServerSideProps(context) {
    const { params } = context;
    const { category } = params;
    const response = await fetch(`http://localhost:4000/news?category=${category}`);
    const data = await response.json();
    return {
        props: {
            articles: data,
            category,
        }
    }
}
```
`context`  can be also used for many other purposes

```js
const { params,req,res,query } = context
console.log(query)
res.setHeader('Set-Cookie', ['name=Pradeep'])
const { category } = params
```

## Client-Side Data Fetching
When you want to load user dashboard like scenario.
then most probably you will use client-side data fetching.
because we don't need SEO for those pages.

For client-side data fetching we can use `useEffect` technique just like react.

**Note:** Next.Js team recommend SWR for data fetching.

SWR has many features like data stream fetching means you do not need to reload if some api data changes and many more.

```js
import useSWR from "swr"

const fetcher = async () => {
    const res = await fetch('http://localhost:4000/dashboard')
    const data = await res.json()
    return data
}

function DashboardSWR() {
    const { data, error } = useSWR('dashboard', fetcher)
    if (error) return 'failed to load'
    if (!data) return 'loading...'
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}
```

## Pre-rendering + Client Side Data Fetching
Consider the following scenario

- We want a event listing page that shows a lists of events happening around us
- SEO + Request time data fetching -> (Server side rendering with getServerSideProps)
- Client side data fetching to filter the event

We can use shallow Routing for changing the route based on the filter
We can combine getServerSideProps and getStaticProps with with client side data fetching and get.

**Shallow Routing: ** - Routing without calling getStaticProps/getServerSideProps

# API Routes Section Intro
- We can create basic API in Next.js
- Handle GET requests
- Handle POST requests
- Dynamic API route
- Handle DELETE requests
- Catch all API routes

## API Routes
API routes allow us to create RESTful endpoints as part of our Next.js application folder structure.
- Within the pages folder, we need to create a folder called `api`
- Within that `api` folder, you can define all the APIs for your applications.
- You can add business logic without needing to write any additional custom server code and without having to configure any API routes.
- Next.js gives us everything we need to write full-stack React + Node application.

We can create API by creating a new folder inside pages with name `api`.
inside api folder every files will be considered as endpoint.

Only we need to export default `handler` function.

```js
export default function handler(req, res) {
    res.status(200).json({ name: 'home API route' })
}
```
We can do the nesting and index.js file same like non api pages.

Catch all route can be used with API as well.
catch all route are not meant to handle route without params.
For that we can use double square brackets `[[..params]]`.

**Note**: Don't call `internal` APIs inside `getStaticProps` as you can directly access them.

## API Routes Section Summary
- API routing mechanism is similar to page based routing mechanism.
- APIs are associated with a route based on their file name
- Every API route exports a default function typically named as handler function.
- The handler function receives the request and response as parameters
- Cater to different requests type like GET and POST using req.method
- We should not call our own API route for pre-rendering content

# Styling Intro
Lets get started with styling our Next.js apps
## Global Styles
Create next app command already gives global styling files.
- Inside the styes folder create a new file called `global.css`. Its already created if you haven't deleted. And import it in pages `_app.js`
- Define anything on global.css it will work globally.

**Adding External CSS Library** - Just add external package and import it inside `_app.js`
If you want to mix your own style then you can use it in global.css.

## Component level styling
For components level styling Next.js supports css modules using a `filename.module.css` convention.

For using inside a component import it and use as a className with styles.className

```js
<div>
    <p className = {styles.paragraph}>Paragraph</p>
</div>
```

## Benefits of using css modules - 
- css modules locally scope css by automatically creating a unique class name which allows us to use the same css class name in different file without having to worry about name collision.
- css modules also don't collide with global style

## SASS Support
SASS is an extension to css that provides powerful features like variables functions and other operation that allow us to build other complex operation in our projects.

- Install tha sass and create fileName.module.scss files and thats it.
- you can enjoy benefits of scss by creating color variables and using multiple places.

**Inline Styling :** You can just use like react.

```js
<h2 style={{color:'red'}}>Hello Inline CSS</h2>
```

## Styling Summary
- **Global** - In our application, we need to import the CSS file within `pages/_app.js`
- **Component level** - Next.js supports CSS modules using a [name].module.css naming convention
- **SASS Support** - install the sass package

# 