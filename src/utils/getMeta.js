export const listWithLogos = async (result) => {


    const fetchLogo = async (channel_id) => {
        var URL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${channel_id}&key=${process.env.REACT_APP_API_KEY}`;
        const res = await fetch(URL, {
            method: "GET", //Method of https request
            headers: {},
        });
        //the resultant json is stored into the data
        const logodata = await res.json();
        let logo = logodata.items[0].snippet.thumbnails.default.url;
        // console.log(logo)
        return logo;
    };
    let v = result?.items;
    v = v.map(async item => {
        item.logo = await fetchLogo(item.snippet.channelId)
        return item
    })

    let finalList = await Promise.all(v).then((res) => {
        
        return res
    })
    return finalList
}
export const listWithStatistics = async (videoList) => {

    let initValue = ''
    const videosId = videoList.reduce(
        ((accumulator, currentValue) => {
            console.log(currentValue)
            if (accumulator)
                return accumulator + ',' + currentValue?.id?.videoId
            else return currentValue?.id?.videoId
        }),
        initValue
    );
    let r = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videosId}&key=${process.env.REACT_APP_API_KEY}`).then(res => res.json())
    
    videoList = videoList.map((item, i) => {
        // console.log(r.items[i].statistics)
        item.statistics = r.items[i].statistics
        return item
    })
    
    return videoList
}