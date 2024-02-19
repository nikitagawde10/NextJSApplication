## Getting Started
For installation type
 ```npx create-next-app@latest``` 
 in the CLI and go through prompts to setup the application with TypeScript and TailwindCSS

First, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 1. Single Static Page with Dynamic Data:
 # Create one static page that displays user profiles from a mock API or statistics fetched from a mock API.
 # Implement basic styling with Tailwind CSS to ensure readability and a clean layout.
 Solution : 
 Since Next.js relies on the nested folder structure to call apis and generate routes we will create the folder structure and name the files appropriately so the hook can easily query that file when requested.

 - For displaying mock data create a file `mock-data.ts` with the mock object. We also define a handler function which will display the `mockUsers`object array when the status is 200 ie the api is functional
- The `index.tsx` is the main page where we will see the mock data being generated. We will use `useSWR hook` to fetch the mock data 
```const { data, error } = useSWR("/api/mock-data", fetcher);
```
- We will also have error and loading states defined for easy debugging and data flow clarity
- We also define tailwindCSS styles to make the fonts and colors more readable

## 2. Dynamic Routing:
 # Set up a dynamic route that allows users to view details for an individual item when selecting an item from the list.
    To create a dynamic route so the user can navigate to a particular user profile using the url or clicking on a name in the list, we use this codeblock 
```
<Link href={`/users/${user.id}`} passHref>
                <span className="text-black hover:underline cursor-pointer">
                    {user.name}
                </span>
                </Link>  
```
    that creates a clickable element that navigates to the user's details page based on the user id extracted when clicked, without refreshing the entire page. The user's name appears as the clickable text, and it will underline on hover to give a visual indication that it is a link.

## 3.Server Action:
 # Set up one server action that performs a simple operation, such as incrementing a counter (this could simulate "liking" a profile or updating a statistic).
 - We start by creating a new file `[id].tsx` in our `api/like` and `users` folder. 
 - In our file in the `api/like/[id].tsx` folder we start off by creating a likes object that initializes all the userIds with the number of likes they have initially.
- Then we define a handler function that extracts the id from the query parameter. It then checks the request method, if its `POST` then it proceeds with incrementing the counter from the likes object we created.
- If its `PUT` method then we reset the like counter to show the initial value. 
- Finally it sets the Allow header to indicate that only `POST` and `PUT` requests are acceptable for this endpoint and throws `405 not allowed` status code.
- In our `pages/users/[id].tsx` file we first extract the id from the request query. A useEffect block finds the user in our mockUsers object based off the id.
- We generate the UI using Tailwind to display the user details and 2 buttons to increment the Like counter and reset the likes to initial state.
- If we are clicking on Like button then `handleLike` function is triggered. This function  sends a `POST` request to `/api/likes`. The response contains an object that gives us the latest value of like counter from the api otherwise it throws an error
- If the reset button is clicked, the `handleReset` function is called. This function finds the originalUser using the userId from the request query. If its successful then it tries to initiate a `PUT` request to the api for that user with the userId and the json body includes the original count of likes from the originalUser in mockUser object. The Content-Type header is set to application/json to inform the server that the request body format is JSON.
- If the server responds with an HTTP status code that indicates success (response.ok is true), the function assumes the like count has been successfully reset on the server.
The function then updates the local component state variable likes with the new like count received from the server response. Otherwise the error is logged on the console.







## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
