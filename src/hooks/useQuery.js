import { useEffect, useState } from "react";

// take in the url
function useQuery(url) {
  const [isLoaded, setIsLoaded] = useState(false);
  // rename `posts` to a more generic `data`
  const [data, setData] = useState(null);
  const [err,setErr] = useState(null);

  useEffect(() => {
    setIsLoaded(false);
    fetch(url)
      .then((r) =>{
        if (r.status >= 400) {
          throw new Error("Server responds with error!")
      }
      return r.json()
          } )
      .then((data) => {
        setData(data);
        setIsLoaded(true);
      },
      err => {
        setErr(err)
        setIsLoaded(true)
    }
      );
  }, [url]);
  // the url is now a dependency
  // we want to use the side effect whenever the url changes

  // return an *object* with the data and isLoaded state
  return { data, isLoaded };
}

export default useQuery;
