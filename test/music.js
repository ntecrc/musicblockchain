/* Writing the test for Music smart contract. 
   Done with Mocha and Chai that comes budnled 
   with truffle */

// Require and create a artifact
var Music = artifacts.require("./Music.sol");

// Declare the contract
contract("Music", function(accounts) {
    var musicInstance;
    // that the contract was initialized with the correct number of candidates
    // Provide description that song choices was initialized
    it("initializes with two song choices", function() {
        return Music.deployed().then(function(instance) {
            return instance.songChoicesCount();
        }).then(function(count) {
            // Ensure that the value is 2 : true
            assert.equal(count, 2);
        });
    });

    /* Testing that the song choices were actully initialized
checking that the name is correct.
checking that the count is correct.

*/
    it("it initializes the song choices with the correct values", function() {
        return Music.deployed().then(function(instance) {
            musicInstance = instance;
            return musicInstance.songChoices(1);

        }).then(function(songchoice) {
            assert.equal(songchoice[0], 1, "contains the correct id");
            assert.equal(songchoice[1], "SongChoice 1", "contains the correct name");
            assert.equal(songchoice[2], 0, "contains the correct vote count");
            return musicInstance.songChoices(2);
        }).then(function(songchoice) {
            assert.equal(songchoice[0], 2, "contains the correct id");
            assert.equal(songchoice[1], "SongChoice 2", "contains the correct name");
            assert.equal(songchoice[2], 0, "contains the correct vote count");

        });
    });

    /* ensure that the voter has not caste 
    checking to make sure the function increments by one
    checking that the voter was added to the mapping
    */
    it("allows a voter to cast a vote", function() {
        return Music.deployed().then(function(instance) {
          musicInstance = instance;
          songId = 1;
          return musicInstance.vote(songId, { from: accounts[0] });
        }).then(function(receipt) {
          assert.equal(receipt.logs.length, 1, "an event was triggered");
          assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
          assert.equal(receipt.logs[0].args._songId.toNumber(), songId, "the song id is correct");
          return musicInstance.voters(accounts[0]);
        }).then(function(voted) {
          assert(voted, "the voter was marked as voted");
          return musicInstance.songChoices(songId);
        }).then(function(songId) {
          var voteCount = songId[2];
          assert.equal(voteCount, 1, "increments the candidate's vote count");
        })
      });



});