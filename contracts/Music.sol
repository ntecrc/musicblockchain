pragma solidity ^0.4.17;

contract Music {
    /* Model a SongChoice */
    struct SongChoice {
        uint id;
        string name;
        uint voteCount;
    }
    
    // Store accounts that have voted
    mapping(address => bool) public voters;


    // Store a @songchoices
    // Fetch @SongName
    mapping(uint => SongChoice) public songChoices;
    // Store songChoices count
    uint public songChoicesCount;

    // voted for song
    event votedEvent (
        uint indexed _songId
    );



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

    function vote (uint _songId) public {
        // require that they havent voted before
        require(!voters[msg.sender], "Sender already voted!");

        // require a validate song
        require(_songId > 0 && _songId <= songChoicesCount, "This is not a validated song!");

        //record that a voter has voted
        voters[msg.sender] = true;

        songChoices[_songId].voteCount ++;

        
    }
}