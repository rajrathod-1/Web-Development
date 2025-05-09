import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.dataset.edit){
        handleEditClick(e.target.dataset.edit);
    }
    else if (e.target.dataset.save) {
        handleSaveEdit(e.target.dataset.save);
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
})
 
function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleEditClick(tweetId)
{
    const tweet = tweetsData.find((tweet) => tweet.uuid === tweetId);

    if(tweet)
    {
        tweet.isEditing = true;
        render();
        document.querySelector(`#edit-tweet-${tweetId}`).classList.add('is-editing');
    }
}


function handleSaveEdit(tweetId) {
    const tweet = tweetsData.find((tweet) => tweet.uuid === tweetId);
    const editedText = document.querySelector(`#edit-tweet-${tweetId}`).value;
    const userName = localStorage.getItem('userName');

    if (tweet) {
        tweet.tweetText = editedText;
        tweet.handle = `@${userName}`;
        tweet.isEditing = false;
        render();
    }
}


function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')
    const userName = localStorage.getItem('userName');
    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@${userName}`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
            isEditing: false
        })
    render()
    tweetInput.value = ''
    }

}

function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                </div>
`
            })
        }
        
        if (tweet.isEditing) {
            feedHtml += `
                <div class="tweet">
                    <div class="tweet-inner">
                        <img src="${tweet.profilePic}" class="profile-pic">
                        <textarea id="edit-tweet-${tweet.uuid}">${tweet.tweetText}</textarea>
                        <div>
                            <button class="edit-save-button" data-save="${tweet.uuid}">Save</button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        else{
          feedHtml += `
                <div class="tweet">
                    <div class="tweet-inner">
                        <img src="${tweet.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${tweet.handle}</p>
                            <p class="tweet-text">${tweet.tweetText}</p>
                            <div class="tweet-details">
                                <span class="tweet-detail">
                                    <i class="fa-regular fa-comment-dots"
                                    data-reply="${tweet.uuid}"
                                    ></i>
                                    ${tweet.replies.length}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-heart ${likeIconClass}"
                                    data-like="${tweet.uuid}"
                                    ></i>
                                    ${tweet.likes}
                                </span>
                                <span class="tweet-detail">
                                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                                    data-retweet="${tweet.uuid}"
                                    ></i>
                                    ${tweet.retweets}
                                </span>
                                <button class="edit-button" data-edit="${tweet.uuid}">Edit</button>
                            </div>   
                        </div>            
                    </div>
                    <div class="hidden" id="replies-${tweet.uuid}">
                        ${repliesHtml}
                    </div>   
                </div>
                `;
        }
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

