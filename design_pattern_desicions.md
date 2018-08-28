In Music.sol 
the contract stores the songChoice so i can also be read. Storing the value I used the constructor 
in the beginning just to ensure that two song choices were initialized when the contract
is deployed.

in Function addSongChoice its added and then also increment the count of the votes.

The function vote ensures the the voter has not voted and validates the song choice.
Then finally I record that the voter has voted. That is why the mapping was created to store the accounts
that have voted.

Testing

the voters test runs to attempt test if the voter has already voted for that particular song
cross checking from the mapping.

The first thing to test for is that an exception is thrown for invalid songchoice. 
we can vote once for songchoice 99 but it will fail because the contract initiates with 
only 2 songchoices.

Please also see the README from the main page. thank you.
