const mainContainerTag = document.querySelector(".mainContainer");
const textareaAncestorTag = document.querySelector(".textareaAncestor");
let array = [];
let arrayForLS = [];

let commentsJson;
const url = "data1.json";
const UIData = async () => {
    const fetchData = await fetch(url);
    const fetchDataWithJson = await fetchData.json();
    commentsJson = fetchDataWithJson;
    if (localStorage.length === 0) {
        const stringData = JSON.stringify(commentsJson);
        localStorage.setItem("JSON",stringData);

        const stringData2 = JSON.stringify(arrayForLS);
        localStorage.setItem("Reply Json", stringData2);
    };

    makingCommentFunction(commentsJson.comments);
    //makingReplyFunction(commentsJson.comments[1].replies,"grandIdUserName-maxblagun1");
    makingTextAreaFunction(textareaAncestorTag,`grandId-0`,"SEND","buttonOnTextarea","ta-textarea");
    userCommentToolsFunction();
    makingPlusAndMinusFunctionOne();
    makingPlusAndMinusFunctionTwo();
    sentCommentFunction();
    localStorageForCommentFunction();
    makingPlusAndMinusFunctionForNewComments();
    replyFunctionOne();
    localStorageForReplyFunctionOne();
    replyFunctionTwo();
    localStorageForReplyFunctionTwo();

    const scoreNumberOneTag = document.querySelector("#scoreNumberamyrobson0");
    const jsonToObjOne = JSON.parse(localStorage.getItem("JSON"));
    scoreNumberOneTag.textContent = jsonToObjOne.comments[0].score;

    const scoreNumberTwoTag = document.querySelector("#scoreNumbermaxblagun1");
    const jsonToObjTwo = JSON.parse(localStorage.getItem("JSON"));
    scoreNumberTwoTag.textContent = jsonToObjTwo.comments[1].score; 

    const scoreNumberThreeTag = document.querySelector("#scoreNumber-ramsesmiron0");
    const jsonToObjThree = JSON.parse(localStorage.getItem(`JSON`));
    scoreNumberThreeTag.textContent = jsonToObjThree.comments[1].replies[0].score;

    const scoreNumberFourTag = document.querySelector("#scoreNumber-juliusomo1");
    const jsonToObjFour = JSON.parse(localStorage.getItem(`JSON`));
    scoreNumberFourTag.textContent = jsonToObjFour.comments[1].replies[1].score;
};

UIData().catch((err) => {
    console.log(err);
});

const makingCommentFunction = (array) => {
    for (let i = 0; i < array.length; i++) {

        const mainGrandParentTag = document.createElement("div");
        mainGrandParentTag.classList.add("mainGrandParent");
        mainGrandParentTag.id = `grandIdUserName-${array[i].user.username  + i}`;

        const mainParentTag = document.createElement("div");
        mainParentTag.classList.add("mainParent");

        //score startpoint
        const scoreParentContainerTag = document.createElement("div");
        scoreParentContainerTag.classList.add("scoreParentContainer");
        
        const scoreContainerTag = document.createElement("div");
        scoreContainerTag.classList.add("scoreContainer");
        
        const scorePlusTag = document.createElement("div");
        scorePlusTag.classList.add("scorePlus");
        scorePlusTag.id = `scorePlus${array[i].user.username + i}`;

        const scoreMinusTag = document.createElement("div");
        scoreMinusTag.classList.add("scoreMinus");
        scoreMinusTag.id = `scoreMinus${array[i].user.username + i}`;

        const scoreNumberTag = document.createElement("div");
        scoreNumberTag.classList.add("scoreNumber");
        scoreNumberTag.textContent = array[i].score;
        scoreNumberTag.id = `scoreNumber${array[i].user.username + i}`;

        scoreContainerTag.append(scorePlusTag ,scoreNumberTag ,scoreMinusTag);
        scoreParentContainerTag.append(scoreContainerTag);
        //score endpoint

        //profile and date startpoint
        const profileAndDataContainerTag = document.createElement("div");
        profileAndDataContainerTag.classList.add("profileAndDataContainer");
        profileAndDataContainerTag.id = `profileContainerName-${array[i].user.username  + i}`;

        const profileImgTag = document.createElement("img");
        profileImgTag.classList.add("profileImg");
        profileImgTag.src = array[i].user.image.png;
        profileImgTag.id = `profileImgName-${array[i].user.username  + i}`;

        const profileNameTag = document.createElement("div");
        profileNameTag.classList.add("profileName");
        profileNameTag.textContent = array[i].user.username;
        profileNameTag.id = `profileName-${array[i].user.username  + i}`;

        const dateTag = document.createElement("div");
        dateTag.classList.add("date");
        dateTag.textContent = array[i].createdAt;
        dateTag.id = `dateName-${array[i].user.username  + i}`;

        profileAndDataContainerTag.append(profileImgTag ,profileNameTag ,dateTag);
        //profile and date endpoint

        //comment startpoint
        const commentContainerTag = document.createElement("div");
        commentContainerTag.classList.add("commentContainer");

        const commentTag = document.createElement("div");
        commentTag.classList.add("comment");
        commentTag.textContent = array[i].content;

        commentContainerTag.append(commentTag);
        //comment endpoint

        // tools startpoint
        const toolsContainerTag = document.createElement("div");
        toolsContainerTag.classList.add("toolsContainer");
        toolsContainerTag.id = `toolsIdName${array[i].user.username + i}`;

        const replyContainerTag = document.createElement("div");
        replyContainerTag.classList.add("replyContainer");
        replyContainerTag.id = `replyIdName${array[i].user.username + i}`;

        const replyTag = document.createElement("div");
        replyTag.classList.add(`reply`);
        replyTag.textContent = "Reply";

        const replyButtonTag = document.createElement("div");
        replyButtonTag.classList.add("replyButton");

        const deleteContainerTag = document.createElement("div");
        deleteContainerTag.classList.add("deleteContainer");
        deleteContainerTag.id = `deleteIdName${array[i].user.username + i}`;

        const deleteTag = document.createElement("div");
        deleteTag.classList.add(`delete`);
        deleteTag.textContent = "Delete";

        const deleteButtonTag = document.createElement("div");
        deleteButtonTag.classList.add("deleteButton");

        const editContainerTag = document.createElement("div");
        editContainerTag.classList.add("editContainer");
        editContainerTag.id = `editIdName${array[i].user.username + i}`;

        const editTag = document.createElement("div");
        editTag.classList.add("edit");
        editTag.textContent = "Edit";

        const editButtonTag = document.createElement("div");
        editButtonTag.classList.add("editButton");

        replyContainerTag.append(replyButtonTag,replyTag);
        deleteContainerTag.append(deleteButtonTag,deleteTag);
        editContainerTag.append(editButtonTag,editTag);

        toolsContainerTag.append(replyContainerTag,deleteContainerTag,editContainerTag);
        //tools endpoint

        mainParentTag.append(scoreParentContainerTag,profileAndDataContainerTag,commentContainerTag,toolsContainerTag);
        mainGrandParentTag.append(mainParentTag)
        mainContainerTag.append(mainGrandParentTag);
        if (array[i].replies.length > 0) {
            makingReplyFunction(array[i].replies,`grandIdUserName-${commentsJson.comments[i].user.username + i}`);
        };
    };
};

const makingReplyFunction = (replyArray,source) => {
    const mainGrandParentTag = document.getElementById(source);

    const mainParentContainerTag = document.createElement("div");
    mainParentContainerTag.classList.add("reply-mainParentContainer");

    for (let i = 0;i < replyArray.length; i++) {
        const mainParentTag = document.createElement("div");
        mainParentTag.classList.add("reply-mainParent");
        mainParentTag.id = `id${replyArray[i].id}`;

        //score startpoint
        const scoreParentContainerTag = document.createElement("div");
        scoreParentContainerTag.classList.add("reply-scoreParentContainer");

        const scoreContainerTag = document.createElement("div");
        scoreContainerTag.classList.add("reply-scoreContainer");

        const scorePlusTag = document.createElement("div");
        scorePlusTag.classList.add("reply-scorePlus");
        scorePlusTag.id = `scorePlus-${replyArray[i].user.username + i}`;

        const scoreMinusTag = document.createElement("div");
        scoreMinusTag.classList.add("reply-scoreMinus");
        scoreMinusTag.id = `scoreMinus-${replyArray[i].user.username + i}`;

        const scoreNumberTag = document.createElement("div");
        scoreNumberTag.classList.add("reply-scoreNumber");
        scoreNumberTag.textContent = replyArray[i].score;
        scoreNumberTag.id = `scoreNumber-${replyArray[i].user.username + i}`;

        scoreContainerTag.append(scorePlusTag ,scoreNumberTag ,scoreMinusTag);
        scoreParentContainerTag.append(scoreContainerTag);
        //score endpoint
        
        //profile and date startpoint
        const profileAndDataContainerTag = document.createElement("div");
        profileAndDataContainerTag.classList.add("reply-profileAndDataContainer");

        const profileImgTag = document.createElement("img");
        profileImgTag.classList.add("reply-profileImg");
        profileImgTag.src = replyArray[i].user.image.png;

        const profileNameTag = document.createElement("div");
        profileNameTag.classList.add("reply-profileName");
        profileNameTag.textContent = replyArray[i].user.username;

        const dateTag = document.createElement("div");
        dateTag.classList.add("reply-date");
        dateTag.textContent = replyArray[i].createdAt;

        const youTag = document.createElement("div");
        youTag.classList.add("youDiv");
        youTag.textContent = "you";
        youTag.id = `you${replyArray[i].id}`;

        profileAndDataContainerTag.append(profileImgTag ,profileNameTag ,youTag ,dateTag);
        //profile and date endpoint

        //comment startpoint
        const commentContainerTag = document.createElement("div");
        commentContainerTag.classList.add("reply-commentContainer");

        const replyToTag = document.createElement("span");
        replyToTag.classList.add("replyTo");
        replyToTag.textContent = "@" + replyArray[i].replyingTo;

        const commentTag = document.createElement("div");
        commentTag.classList.add("reply-comment");
        commentTag.textContent = " " + replyArray[i].content;

        commentContainerTag.append(replyToTag,commentTag);
        //comment endpoint
        // tools startpoint
        const toolsContainerTag = document.createElement("div");
        toolsContainerTag.classList.add("reply-toolsContainer");
        toolsContainerTag.id = `tools${replyArray[i].id}`;

        const replyContainerTag = document.createElement("div");
        replyContainerTag.classList.add("reply-replyContainer");
        replyContainerTag.id = `reply${replyArray[i].id}`;

        const replyTag = document.createElement("div");
        replyTag.classList.add(`reply-reply`);
        replyTag.textContent = "Reply";
        replyTag.id = `r${replyArray[i].id}`;

        const replyButtonTag = document.createElement("div");
        replyButtonTag.classList.add("reply-replyButton");

        const deleteContainerTag = document.createElement("div");
        deleteContainerTag.classList.add("reply-deleteContainer");
        deleteContainerTag.id = `delete${replyArray[i].id}`;

        const deleteTag = document.createElement("div");
        deleteTag.classList.add(`reply-delete`);
        deleteTag.textContent = "Delete";
        deleteTag.id = `d${replyArray[i].id}`;

        const deleteButtonTag = document.createElement("div");
        deleteButtonTag.classList.add("reply-deleteButton");

        const editContainerTag = document.createElement("div");
        editContainerTag.classList.add("reply-editContainer");
        editContainerTag.id = `edit${replyArray[i].id}`;

        const editTag = document.createElement("div");
        editTag.classList.add("reply-edit");
        editTag.textContent = "Edit";
        editTag.id = `e${replyArray[i].id}`;

        const editButtonTag = document.createElement("div");
        editButtonTag.classList.add("reply-editButton");

        replyContainerTag.append(replyButtonTag,replyTag);
        deleteContainerTag.append(deleteButtonTag,deleteTag);
        editContainerTag.append(editButtonTag,editTag);

        toolsContainerTag.append(replyContainerTag,deleteContainerTag,editContainerTag);
        //tools endpoint
        const miniParentTag = document.createElement("div");
        miniParentTag.classList.add(`reply-miniParent`);
        miniParentTag.id = `miniParent${i}`;

        miniParentTag.append(scoreParentContainerTag,profileAndDataContainerTag,commentContainerTag,toolsContainerTag);
        mainParentTag.append(miniParentTag);
        mainParentContainerTag.append(mainParentTag);
        mainGrandParentTag.append(mainParentContainerTag);
        mainContainerTag.append(mainGrandParentTag);

        if (replyArray[i].score === 0) {
            mainParentContainerTag.id = "newReply";
        }
    };
};

const makingTextAreaFunction = (tag,id,sent,id2,id3) => {
    const grandParentTag = document.createElement("div");
    grandParentTag.classList.add("grandParent");
    grandParentTag.id = id;

    const mainTextareaContainerTag = document.createElement("div");
    mainTextareaContainerTag.classList.add("mainTextareaContainer");

    const textareaContainerTag = document.createElement("div");
    textareaContainerTag.classList.add("textareaContainer");

    //textarea image startpoint
    const textareaImageContainerTag = document.createElement("div");
    textareaImageContainerTag.classList.add("textareaImageContainer");

    const textareaImageTag = document.createElement("img");
    textareaImageTag.src = commentsJson.currentUser.image.png;
    textareaImageTag.classList.add("textareaImage");

    textareaImageContainerTag.append(textareaImageTag);
    //textarea image endpoint

    //textarea startpoint
    const miniTextareaContainerTag = document.createElement("div");
    miniTextareaContainerTag.classList.add("miniTextareaContainer");

    const textareaTag = document.createElement("textarea");
    textareaTag.classList.add("textarea");
    textareaTag.placeholder = "Add a comment...";
    textareaTag.id = id3;


    miniTextareaContainerTag.append(textareaTag);
    //textarea endpoint

    //sentButton startpoint
    const sentButtonContainerTag = document.createElement("div");
    sentButtonContainerTag.classList.add("sentButtonContainer");

    const sentButtonTag = document.createElement("button");
    sentButtonTag.classList.add("sentButton");
    sentButtonTag.id = id2;

    sentButtonTag.textContent = sent;

    sentButtonContainerTag.append(sentButtonTag);
    //sentbutton endpoint

    textareaContainerTag.append(textareaImageContainerTag ,miniTextareaContainerTag ,sentButtonContainerTag);
    mainTextareaContainerTag.append(textareaContainerTag);
    grandParentTag.append(mainTextareaContainerTag);
    tag.append(grandParentTag);
};

const userCommentToolsFunction = () => {
    const replyReplyTag = document.getElementById("reply4");
    const replyDeleteTag = document.getElementById("d4");
    const replyEditTag = document.getElementById("e4");
    const you4Tag = document.getElementById("you4");
    const replynameTag = document.getElementsByClassName("reply-profileName")[1];
    if (replynameTag.textContent === "juliusomo") {
        replyReplyTag.style.display = "none";
        replyDeleteTag.style.display = "block";
        replyEditTag.style.display = "block";
        you4Tag.style.display = "block";
    };
};

const makingPlusAndMinusFunctionOne = () => {
    const scorePlusOneTag = document.querySelector("#scorePlusamyrobson0");
    const scoreMinusOneTag = document.querySelector("#scoreMinusamyrobson0");
    const scoreNumberOneTag = document.querySelector("#scoreNumberamyrobson0");

    const scorePlusTwoTag = document.querySelector("#scorePlusmaxblagun1");
    const scoreMinusTwoTag = document.querySelector("#scoreMinusmaxblagun1");
    const scoreNumberTwoTag = document.querySelector("#scoreNumbermaxblagun1");

    scorePlusOneTag.addEventListener("click", () => {
        console.log("fuck");
        //plusFunction(scoreNumberOneTag,0);
    });

    scoreMinusOneTag.addEventListener("click", () => {
        minusFunction(scoreNumberOneTag,0);
    });

    scorePlusTwoTag.addEventListener("click", () => {
        plusFunction(scoreNumberTwoTag,1);
    });

    scoreMinusTwoTag.addEventListener("click", () => {
        minusFunction(scoreNumberTwoTag,1);
    });
}; 

const plusFunction = (tag,source) => {
    const arrayFromLocalStorage = localStorage.getItem("JSON");
    const parsedJson = JSON.parse(arrayFromLocalStorage);
    parsedJson.comments[source].score += 1;
    tag.textContent = parsedJson.comments[source].score;
    const arrayToLocalStorage = JSON.stringify(parsedJson);
    localStorage.setItem("JSON",arrayToLocalStorage);
};

const minusFunction = (tag,source) => {
    const arrayFromLocalStorage = localStorage.getItem("JSON");
    const parsedJson = JSON.parse(arrayFromLocalStorage);
    parsedJson.comments[source].score -= 1;
    tag.textContent = parsedJson.comments[source].score;
    const arrayToLocalStorage = JSON.stringify(parsedJson);
    localStorage.setItem("JSON",arrayToLocalStorage);
};

const makingPlusAndMinusFunctionTwo = () => {
    const scorePlusThreeTag = document.querySelector("#scorePlus-ramsesmiron0");
    const scoreMinusThreeTag = document.querySelector("#scoreMinus-ramsesmiron0");
    const scoreNumberThreeTag = document.querySelector("#scoreNumber-ramsesmiron0");

    const scorePlusFourTag = document.querySelector("#scorePlus-juliusomo1");
    const scoreMinusFourTag = document.querySelector("#scoreMinus-juliusomo1");
    const scoreNumberFourTag = document.querySelector("#scoreNumber-juliusomo1");

    scorePlusThreeTag.addEventListener("click", () => {
        plusFunctionTwo(scoreNumberThreeTag,0);
    });

    scoreMinusThreeTag.addEventListener("click", () => {
        minusFunctionTwo(scoreNumberThreeTag,0);
    });

    scorePlusFourTag.addEventListener("click", () => {
        plusFunctionTwo(scoreNumberFourTag,1);
    });

    scoreMinusFourTag.addEventListener("click", () => {
        minusFunctionTwo(scoreNumberFourTag,1);
    });
};

const plusFunctionTwo = (tag,i) => {
    const arrayFromLocalStorage = localStorage.getItem("JSON");
    const parsedJson = JSON.parse(arrayFromLocalStorage);
    parsedJson.comments[1].replies[i].score += 1;
    tag.textContent = parsedJson.comments[1].replies[i].score;
    const arrayToLocalStorage = JSON.stringify(parsedJson);
    localStorage.setItem("JSON",arrayToLocalStorage);
};

const minusFunctionTwo = (tag,i) => {
    const arrayFromLocalStorage = localStorage.getItem("JSON");
    const parsedJson = JSON.parse(arrayFromLocalStorage);
    parsedJson.comments[1].replies[i].score -= 1;
    tag.textContent = parsedJson.comments[1].replies[i].score;
    const arrayToLocalStorage = JSON.stringify(parsedJson);
    localStorage.setItem("JSON",arrayToLocalStorage);
};

let one = 1;
const sentCommentFunction = () => {
    const textareaTag = document.querySelector(".textarea");
    const sentButtonTag = document.querySelector(".sentButton");

    textareaTag.addEventListener("change", (event) => {
        let textInTextarea = event.target.value;
        array.splice(0 , array.length);
        
        sentButtonTag.addEventListener("click", () => {
            for (let i = 0; i < array.length; i++) {
                const grandParentTag = document.querySelectorAll(`#grandIdUserName-juliusomo${i}`);
                grandParentTag.forEach(tag => {
                    tag.remove();
                });
            };
            textareaTag.value = "";
            let newComments = {};
            array.push(newComments);

            if (array.length > 0) {
                newComments.id = one;
                one += 1;
                newComments.content = textInTextarea.toString();
                newComments.createdAt = "Just Now";
                newComments.score = 0;
                let png = commentsJson.currentUser.image.png;
                let image = {};
                image.png = png;
                let user = {};
                user.image = image;
                newComments.user = user;
                let username = commentsJson.currentUser.username;
                newComments.user.username = username;
                newComments.replies = [];

                const jsonFromLocalStorage = localStorage.getItem("JSON");
                    const parsedJson = JSON.parse(jsonFromLocalStorage);
                    if (parsedJson.comments.length > 2) {
                        parsedJson.comments.splice(2,array.length - 1);
                        parsedJson.comments.push(newComments);
                    } else {
                        parsedJson.comments.push(newComments);
                    };

                makingCommentFunction(array);
                for (let i = 0; i < array.length; i++) {
                    const profileContainerTag = document.querySelector(`#profileContainerName-juliusomo${i}`);
                    const profileImgTag = document.querySelector(`#profileImgName-juliusomo${i}`);
                    const profileNameTag = document.querySelector(`#profileName-juliusomo${i}`);
                    const dateTag = document.querySelector(`#dateName-juliusomo${i}`);

                    const youTag = document.createElement("div");
                    youTag.classList.add("youDiv");
                    youTag.textContent = "you";
                    youTag.id = `you${array[i].id}`;

                    profileContainerTag.append(profileImgTag ,profileNameTag ,youTag ,dateTag);
                    
                    if (profileNameTag.textContent === `juliusomo`) {
                        const replyContainerTag = document.querySelector(`#replyIdNamejuliusomo${i}`);
                        const deleteContainerTag = document.querySelector(`#deleteIdNamejuliusomo${i}`);
                        const editContainerTag = document.querySelector(`#editIdNamejuliusomo${i}`);
                        const toolsContainerTag = document.querySelector(`#toolsIdNamejuliusomo${i}`);

                        replyContainerTag.style.display = "none";
                        deleteContainerTag.style.display = "flex";
                        editContainerTag.style.display = "flex";
                        toolsContainerTag.style.display = "flex";
                    };

                    const jsonToLocalStorage = JSON.stringify(parsedJson);
                    localStorage.setItem("JSON",jsonToLocalStorage);

                    const scorePlusTag = document.querySelector(`#scorePlusjuliusomo${i}`);
                    const scoreMinusTag = document.querySelector(`#scoreMinusjuliusomo${i}`);
                    const scoreNumberTag = document.querySelector(`#scoreNumberjuliusomo${i}`);
          
                    scorePlusTag.addEventListener("click" , () => {
                        const parsedJsonObj = JSON.parse(localStorage.getItem(`JSON`));
                        parsedJsonObj.comments[i += 2] += 1;

                        scoreNumberTag.textContent = parsedJsonObj.comments[i += 2];
                        const stringifyJsonObj = JSON.stringify(parsedJsonObj);
                        localStorage.setItem(`JSON`,stringifyJsonObj);
                    });

                    scoreMinusTag.addEventListener("click", () => {
                        const parsedJsonObj = JSON.parse(localStorage.getItem(`JSON`));
                        parsedJsonObj.comments[i += 2] -= 1;

                        scoreNumberTag.textContent = parsedJsonObj.comments[i -= 2];
                        const stringifyJsonObj = JSON.stringify(parsedJsonObj);
                        localStorage.setItem(`JSON`,stringifyJsonObj);
                    });
                };
            } else {
                return;
            };    
        });
    });
};

let secondArray = [];
const localStorageForCommentFunction = () => {
    const jsonFromLocalStorage = localStorage.getItem("JSON");
    const parsedJson = JSON.parse(jsonFromLocalStorage);
    if (parsedJson.comments.length > 2) {
        mainContainerTag.innerHTML = "";
        makingCommentFunction(parsedJson.comments);

        for (let i = 0; i < parsedJson.comments.length; i++) {
            if (i === 2 || i > 2) {
                const profileContainerTag = document.querySelector(`#profileContainerName-juliusomo${i}`);
                const profileImgTag = document.querySelector(`#profileImgName-juliusomo${i}`);
                const profileNameTag = document.querySelector(`#profileName-juliusomo${i}`);
                const dateTag = document.querySelector(`#dateName-juliusomo${i}`);

                const youTag = document.createElement("div");
                youTag.classList.add("youDiv");
                youTag.textContent = "you";
                youTag.id = `you${i}`;

                profileContainerTag.append(profileImgTag ,profileNameTag ,youTag ,dateTag);
            
                if (profileNameTag.textContent === `juliusomo`) {

                    const replyContainerTag = document.querySelector(`#replyIdNamejuliusomo${i}`);
                    const deleteContainerTag = document.querySelector(`#deleteIdNamejuliusomo${i}`);
                    const editContainerTag = document.querySelector(`#editIdNamejuliusomo${i}`);
                    const toolsContainerTag = document.querySelector(`#toolsIdNamejuliusomo${i}`);

                    replyContainerTag.style.display = "none";
                    deleteContainerTag.style.display = "flex";
                    editContainerTag.style.display = "flex";
                    toolsContainerTag.style.display = "flex";
                };
            }
        };
    };
};

const makingPlusAndMinusFunctionForNewComments = () => {
    const jsonFromLocalStorage = localStorage.getItem("JSON");
    const parsedJson = JSON.parse(jsonFromLocalStorage);
    if (parsedJson.comments.length > 2) {
        for (let i = 2; i < parsedJson.comments.length; i++) {
            const scorePlusTag = document.querySelector(`#scorePlusjuliusomo${i}`);
            const scoreMinusTag = document.querySelector(`#scoreMinusjuliusomo${i}`);
            const scoreNumberTag = document.querySelector(`#scoreNumberjuliusomo${i}`);
              
            scorePlusTag.addEventListener("click" , () => {
                parsedJson.comments[i].score += 1;
                scoreNumberTag.textContent = parsedJson.comments[i].score;
    
                const stringifyJsonObj = JSON.stringify(parsedJson);
                localStorage.setItem(`JSON`,stringifyJsonObj);
            });

            scoreMinusTag.addEventListener("click", () => {
                if (scoreNumberTag.textContent == "0") {
                    return;
                } else {
                    parsedJson.comments[i].score -= 1;
                    scoreNumberTag.textContent = parsedJson.comments[i].score;
    
                    const stringifyJsonObj = JSON.stringify(parsedJson);
                    localStorage.setItem(`JSON`,stringifyJsonObj);
                };
            });
        };
    };
}; 

let newReplyCommentArray = [];
const replyFunctionOne = () => {
    const jsonFromLocalStorage = localStorage.getItem("JSON");
    const parsedJson = JSON.parse(jsonFromLocalStorage);
    for (let i = 0; i < 2; i++) {
        const replyTag = document.querySelector(`#replyIdName${parsedJson.comments[i].user.username}${i}`);
        const mainGrandParentTag = document.querySelector(`#grandIdUserName-${parsedJson.comments[i].user.username + i}`);
        
        replyTag.addEventListener("click", () => {
            const replyFunctionExist = mainGrandParentTag.classList.contains("replyFunction-arrived");
            if (replyFunctionExist) {
                const mainGrandParentTag = document.querySelector(".replyFunction-arrived");
                makingTextAreaFunction(mainGrandParentTag,`grandId${commentsJson.currentUser.username + i}`,"REPLY",`buttonId${commentsJson.currentUser.username + i}`,`textareaId${commentsJson.currentUser.username + i}`);
                const grandParentTag = document.querySelectorAll(`#grandId${commentsJson.currentUser.username + i}`);
                grandParentTag.forEach(tag => {
                    mainGrandParentTag.classList.remove("replyFunction-arrived");
                    tag.remove();
                });
            } else {
                makingTextAreaFunction(mainGrandParentTag,`grandId${commentsJson.currentUser.username + i}`,"REPLY",`buttonId${commentsJson.currentUser.username + i}`,`textareaId${commentsJson.currentUser.username + i}`);
                mainGrandParentTag.classList.add("replyFunction-arrived");

                const textareaTag = document.querySelector(`#textareaId${commentsJson.currentUser.username + i}`);
                const replyButtonTag = document.querySelector(`#buttonId${commentsJson.currentUser.username + i}`);

                textareaTag.addEventListener("change", (event) => {
                    const textPhrase = event.target.value;
                    newReplyCommentArray.splice(0,newReplyCommentArray.length);

                    replyButtonTag.addEventListener("click", () => {
                        textareaTag.value = "";
                        let newReplyComments = {};
                        newReplyCommentArray.push(parsedJson);
                        
                        if (newReplyCommentArray.length > 0) {
                            newReplyComments.id = array.length;
                            newReplyComments.content = textPhrase.toString();
                            newReplyComments.createdAt = "Just Now";
                            newReplyComments.score = 0;
                            let png = commentsJson.currentUser.image.png;
                            let image = {};
                            image.png = png;
                            let user = {};
                            user.image = image;
                            newReplyComments.user = user;
                            let username = commentsJson.currentUser.username;
                            newReplyComments.user.username = username;
                            newReplyComments.replyingTo = parsedJson.comments[i].user.username;
                            parsedJson.comments[i].replies.push(newReplyComments);
                            
                            const jsonToLocalStorage = JSON.stringify(parsedJson);
                            localStorage.setItem("JSON",jsonToLocalStorage);

                            const jsonFromLocalStorage = localStorage.getItem("JSON");
                            const returnParsedJson = JSON.parse(jsonFromLocalStorage);

                            mainContainerTag.innerHTML = "";
                            makingCommentFunction(returnParsedJson.comments);
                            makingTextAreaFunction(mainGrandParentTag,`grandId${commentsJson.currentUser.username + i}`,"REPLY",`buttonId${commentsJson.currentUser.username + i}`,`textareaId${commentsJson.currentUser.username + i}`);
                            mainGrandParentTag.classList.add("replyFunction-arrived");
                            replyFunctionOne();
                        } else {
                            return;
                        };
                    });
                });
            };
        }); 
    };
};

const localStorageForReplyFunctionOne = () => {
    const jsonFromLocalStorage = localStorage.getItem("JSON");
    const parsedJson = JSON.parse(jsonFromLocalStorage);
    for (let i = 0; i < 2; i++) {
        if (parsedJson.comments[i].replies.length > 0) {
            mainContainerTag.innerHTML = "";
            makingCommentFunction(parsedJson.comments);
            replyFunctionOne();
        };
    };
};

let numberOne = 1;
let newReplyCommentArrayTwo = [];
const replyFunctionTwo = () => {
    const replyContainerTag = document.querySelector("#id3");
    const replyButtonTag = document.querySelector("#reply3");

    replyButtonTag.addEventListener("click", () => {
        const replyFunctionExist = replyContainerTag.classList.contains("replyFunction-arrived");
        if (replyFunctionExist){
            const replyContainerTag = document.querySelector(".replyFunction-arrived");
            makingTextAreaFunction(replyContainerTag,`grandIdFromReplyFunction${commentsJson.currentUser.username}0`,"REPLY",`buttonIdFromReplyFunction${commentsJson.currentUser.username}0`,`textareaIdFromReplyFunction${commentsJson.currentUser.username}0`);
            const grandParentTag = document.querySelectorAll(`#grandIdFromReplyFunction${commentsJson.currentUser.username}0`);
            grandParentTag.forEach(tag => {
                replyContainerTag.classList.remove("replyFunction-arrived");
                tag.remove();
            });
        } else {
            makingTextAreaFunction(replyContainerTag,`grandIdFromReplyFunction${commentsJson.currentUser.username}0`,"REPLY",`buttonIdFromReplyFunction${commentsJson.currentUser.username}0`,`textareaIdFromReplyFunction${commentsJson.currentUser.username}0`);
            replyContainerTag.classList.add("replyFunction-arrived");

            const textareaTag = document.querySelector("#textareaIdFromReplyFunctionjuliusomo0");
            const buttonTag = document.querySelector("#buttonIdFromReplyFunctionjuliusomo0");

            textareaTag.addEventListener("change", (event) => {
                const textPhrase = event.target.value;
                newReplyCommentArrayTwo.splice(0 , newReplyCommentArrayTwo.length);

                buttonTag.addEventListener("click", () => {
                    textareaTag.value = "";
                    let reply = {};
                    newReplyCommentArrayTwo.push(reply);

                    if (newReplyCommentArrayTwo.length > 0) {
                        reply.id = array.length;
                        reply.content = textPhrase.toString();
                        reply.createdAt = "Just Now";
                        reply.score = 0;
                        let png = commentsJson.currentUser.image.png;
                        let image = {};
                        image.png = png;
                        let user = {};
                        user.image = image;
                        reply.user = user;
                        let username = commentsJson.currentUser.username;
                        reply.user.username = username;
                        reply.replyingTo = commentsJson.comments[1].replies[0].user.username;

                        const jsonFromLocalStorage = localStorage.getItem("Reply Json");
                        const parsedJson = JSON.parse(jsonFromLocalStorage);
                        parsedJson.push(reply);

                        const stringData = JSON.stringify(parsedJson);
                        localStorage.setItem("Reply Json", stringData);

                        makingReplyFunction(newReplyCommentArrayTwo,"grandIdUserName-maxblagun1");

                        const replyContainerTag = document.querySelector(".replyFunction-arrived");
                        makingTextAreaFunction(replyContainerTag,`grandIdFromReplyFunction${commentsJson.currentUser.username}0`,"REPLY",`buttonIdFromReplyFunction${commentsJson.currentUser.username}0`,`textareaIdFromReplyFunction${commentsJson.currentUser.username}0`);
                        const grandParentTag = document.querySelectorAll(`#grandIdFromReplyFunction${commentsJson.currentUser.username}0`);
                        grandParentTag.forEach(tag => {
                        replyContainerTag.classList.remove("replyFunction-arrived");
                            tag.remove();
                        });
                    } else {
                        return;
                    }
                });
            });
        };
    });
};

const localStorageForReplyFunctionTwo = () => {
    const jsonFromLocalStorage = localStorage.getItem("Reply Json");
    const parsedJson = JSON.parse(jsonFromLocalStorage);

    if (parsedJson.length > 0) {
        makingReplyFunction(parsedJson,"grandIdUserName-maxblagun1");
    } else {
        return;
    };
};