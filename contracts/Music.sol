pragma solidity ^0.4.17;

contract Music {
    // store song name
    // read song name

    // state variable that can be stored as string
    string public songName;

    // constructor to set value of variable song name
    constructor () public {
        // songName is a state variable
        songName = "songName1";

    }
}