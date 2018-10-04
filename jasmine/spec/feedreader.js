/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Tests if feed url is defined 
         * loops through each feed in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function() {
            allFeeds.forEach(function(feed){
                //checks both length & undefined
                expect(feed.url).toBeTruthy();
            })
        });

        /* Tests if feed name is defined 
         * loops through each feed in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function() {
            allFeeds.forEach(function(feed){
                //checks both length & undefined
                expect(feed.name).toBeTruthy();
            })
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* Test if menu is hidden by default
         */
        it('menu hidden', function() {
            let menu = $('body').hasClass('menu-hidden');
            expect(menu).toBe(true);
        });

         /* Test to ensure the menu changes visibility when the menu icon is clicked 
          *  appears on first click
          *  hides when clicked again.
          */
         it('menu toggled', function() {
            let menuButton =  $('.icon-list');
            
            menuButton.click();
            let menu = $('body').hasClass('menu-hidden');
            expect(menu).toBe(false);

            menuButton.click();
            menu = $('body').hasClass('menu-hidden');
            expect(menu).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        //needed as this is an async function
        beforeEach(function(done){
            loadFeed(0, done);
        });

        /* Test at least 1 feed is loaded upon start of app
        */
        it('entries loaded', function() {
            let feed =  $('.feed .entry');
            expect(feed.length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let feed1 = [], feed2 = [];

        //needed as this is an async function
        beforeEach(function(done){
            loadFeed(0, function(){
                let feed = $('.feed')[0].children;
                Array.from(feed).forEach(function(entry){
                feed1.push(entry.innerText);
            });
            loadFeed(1, done);
        });
    });

        /* Test that feed content changes when a different feed is loaded
         */
        it('feed changed', function() {            
            feed = $('.feed')[0].children;
            Array.from(feed).forEach(function(entry){
                feed2.push(entry.innerText);
            });

            for(i=0; i<10; i++){
            expect(feed1[i] == feed2[i]).toBe(false);
            }
        });
    });
}());
