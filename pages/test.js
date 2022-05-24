
export default function testProjectTasks(){

/****************************   test profile   ****************************/



    console.log(`initial owner - profile UserInfo: ${userInfoProfile.getUserProfile()}`);
    
    /** example of save profile data on the page and on the server once edited  */
    const setDefaultProfile = editProfile({
    newUserProfileData: defaultUserProfile, 
    userTargetExtension: defaultUsersExtensions.owner
    });
    console.log(`edited owner - default profile: ${setDefaultProfile}`);
    console.log(`edited profile UserInfo: ${userInfoProfile.getUserProfile()}`);

    const editedProfile = editProfile({
    newUserProfileData: myUserProfile, 
    userTargetExtension: defaultUsersExtensions.owner
    });
    console.log(`edited owner - my profile : ${editedProfile}`);
    console.log(`edited profile UserInfo: ${userInfoProfile.getUserProfile()}`);
      
      


/******************************   test cards   *****************************/


/***************************************************************************/

    /**   I may have mistakenly sabotaged the original API data.
         My try to fix it didn't work out */

    // /** NO Access */
    // setInitialApiData(defaultCardsList);

    // /** delete exist data and post its default values */
    // function setInitialApiData(defaultCardsList, defaultUserProfile){
    //   cardsApiData.setCardsApi(defaultCardsList);
    // }

   /** 'initial' cards: */
   addNewPostCardsList(defaultCardsList);

/***************************************************************************/
    
     debugger;

      /**  new-cards on the page once added on the server: */  
      addNewPostCardsList(myCardsList);
      
    
    }
    
/***************************************************************************/

     