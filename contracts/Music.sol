pragma solidity ^0.4.17;

contract Music {
    /* Model a SongChoice */
    struct SongChoice {
        uint id;
        string name;
        uint voteCount;
    }
    
    // Store a @songchoices
    // Fetch @SongName
    mapping(uint => SongChoice) public songChoices;
    // Store songChoices count
    uint public songChoicesCount;

    // Constructor to set value of variable song name
    // Keeps track of how many song choices there are 
    constructor () public {
        addSongChoice("SongChoice 1");
        addSongChoice("SongChoice 2");   

    }

    /* We add a different @songChoice here and increment */
    function addSongChoice (string _name) private {
        // increment songChoice count
        songChoicesCount ++;
        /* Create @songChoice and then assign it to new 
        songchoice and assign the id, name and voteCount */
        songChoices[songChoicesCount] = SongChoice(songChoicesCount, _name, 0);
    }


    


}