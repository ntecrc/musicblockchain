App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  /* Initializes Web3 and connects it to the blockchain */
  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    // gets the json file from src build contracts filepath can be see through server syn file
    $.getJSON("Music.json", function(music) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Music = TruffleContract(music);
      // Connect provider to interact with contract
      App.contracts.Music.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Music.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  },

  render: function() {
    var musicInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Music.deployed().then(function(instance) {
      musicInstance = instance;
      return musicInstance.songChoicesCount();
    }).then(function(songChoicesCount) {
      var songChoiceResults = $("#songChoiceResults");
      songChoiceResults.empty();

      var songSelect = $('#songSelect');
      songSelect.empty();

      for (var i = 1; i <= songChoicesCount; i++) {
        musicInstance.songChoices(i).then(function(songchoice) {
          var id = songchoice[0];
          var name = songchoice[1];
          var voteCount = songchoice[2];

          // Render SongChoice Result
          var songChoiceTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          songChoiceResults.append(songChoiceTemplate);

          // Render Song choice option
          var songOption = "<option value='" + id + "' >" + name + "</ option>"
          songSelect.append(songOption);
        });
      }
      return musicInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      if(hasVoted) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function() {
    var songId = $('#songSelect').val();
    App.contracts.Music.deployed().then(function(instance) {
      return instance.vote(songId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});