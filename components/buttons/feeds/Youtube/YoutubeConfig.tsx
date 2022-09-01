import { useEffect, useState } from "react";


export function Youtube({limit}:any) {
const[tube,setTube]=useState([])


const [articles, setArticles] = useState([]);
const [query, setQuery] = useState("cat");
useEffect(() => {
		fetch(`https://www.reddit.com/search.json?limit=${limit}&q=10`).then((result) => {
			if (result.status != 200) {
				console.log("ERRPORR, BRUVVV");
			}
			result.json().then((datas) => {
				if (datas != null) {

					setArticles(datas.data.children);
				}
			});
		});
	}, [query]);





let urll='<figure className="op-interactive"><iframe id="reddit-embed" src="https://www.redditmedia.com/{}?ref_source=embed&amp;ref=share&amp;embed=true" sandbox="allow-scripts allow-same-origin allow-popups" height="444" width="640" scrolling="no"></iframe></figure>'

	return (

		<>


	<div className="self-center hidden items-center mt-10 w-full  gap-10 flex flex-col ">

{articles.map((x)=>(
<iframe id="reddit-embed" src={`https://www.redditmedia.com/${x.data.permalink}?ref_source=embed&amp;ref=share&amp;embed=true` } sandbox="allow-scripts allow-same-origin allow-popups"  height="500" width="90%" scrolling="no"></iframe>


))}
</div>
		</>
	);
}
