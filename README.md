# Radio Station Musicblockchain

Welcome to the Radio Station Music Voting Dapp.  The radio stations can list the songs that they want the public to vote on.

The purpose of this Dapp is to add another revenue stream for the radio stations.  So for example, Toronto radio statinos, often 
ask their listeners to call into their show and request a song, or text them and request a song.  This process involves listeners
to follow the processes but also charge a small fee for the text and phone call.  Additionally, for radio talk show's listeners 
are asked to call in, or reply in text often again for a small fee.  

This Dapp can provide radio stations an opportunity for another revenue stream and also keep audience comments on record, accountable,
traceable and also allow radio stations to monetize with ether.

How To:

LocalHost:
1. ensure that your ports are correct 7545.
2. Metamask needs to be on localhost: { enter port# }
3. Start Ganache
4. Test the Dapp

** if the user has voted it will hang to the "Loading" website.

On Surge:

* Dapp was deployed on Surge * Warning when testing sometimes it would go to the website and work other times it would not. Not sure
what was happening.

however this is best accessed through localhost. As always ensure metamask is enabled on the test network.

Bugs:

The file bs-config.json points to the 'Music.json' that the npm dev attempts to locate.  I was having issues with this file being relocated
to a different route.

example:
{
  "server": {
    "baseDir": ["./src", "./src/build/contracts"]
  }
}

I had to change the route sometimes. Also I had to change the physical path of 'Build'

TODO: proper landing page.

TODO: enable API music list calls and voting functions

#About Me:
** A little about me, I am a current student as I continue learning and expanding my knowledge.  I would love to apply what I have 
learned in this course especially in healthcare where I have quite a few years of experience as a nurse.

Thank you for taking the time to grade my project.
