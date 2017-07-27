(function() {
  var questions = [{
    question: "Who the jiggy nigga with the gold links? \
    Got me reminiscin' 'bout my old day. \
    Three 6, _____",
    song: "../resources/mp3/jodye.mp3",
    gif: "../resources/gif/rocky.gif",
    choices: ["7,8,9", "suck a nigga dick, no foreplay, all day","come suck a dick"
    ,"Boomin' out the trap through the hallway"],
    correctAnswer: 1
  }, {
    question: "I got two mortgages, thirty million in total, \
    I got niggas that'll still try fuckin me over, \
    I got rap niggas that I gotta act like I like, \
    _____",
    song: "../resources/mp3/energy.mp3",
    gif: "../resources/gif/drake.gif",
    choices: ["But y'all don't wanna see Win Win, 50 or Whoa", "Bout to call your ass a Uber, I got somewhere to be",
      "But I got bitches askin me about the code for the Wi-Fi","But my actin' days are over, fuck them niggas for life"],
    correctAnswer: 3
  }, {
    question: "Because you treat me like shit, \
    I paid for the bed and never even slept in it, \
    I paid for that crib I never stepped foot in, \
    _______",
    song: "../resources/mp3/babyblue.mp3",
    gif: "../resources/gif/action.gif",
    choices: ["And now somebody else is in there poopin", "And now my dashboard wooden",
      "And now somebody else is eating all the pudding","And now we out here cookin"],
    correctAnswer: 2
  }, {
    question: "I get this motherfucker jumpin' bitch you know why I came, \
      They told me Thou Shalt not kill when I jumped in the flame, \
      I'm cocoo for the cocoa leaves and I turned it to dope, \
      The money never grew on trees but _________",
    song: "../resources/mp3/dope.mp3",
    gif: "../resources/gif/q1.gif",
    choices: ["you might find me slappin' bones", "We talkin' cold watchin' hoes",
      "I'm watching it grow", "us lil' niggas love gold chains"],
    correctAnswer: 2
  }, {
    question: "I just fucked your bitch in some Gucci flip flops, \
      I just had some bitches and I made 'em lip lock, \
      I just took a piss and _________",
    song: "../resources/mp3/drought.mp3",
    gif: "../resources/gif/gucci.gif",
    choices: ["I seen codeine coming out", "choose the dirty over you",
      "thought it was a drought", "had to make me a cot"],
    correctAnswer: 0
  },{
    question: "Hi, kids! Do you like violence? \
    Wanna see me stick nine inch nails through each one of my eyelids? \
    Wanna copy me and do exactly like I did? \
    Try 'cid and get fucked up worse than my life is \
    My brain's dead weight, I'm trying to get my head straight \
    But I can't figure out _________",
    song: "../resources/mp3/mynameis.mp3",
    gif: "../resources/gif/em.gif",
    choices: ["What my name is", "which Spice Girl I want to impregnate",
      "my original self from the top bunk with a belt", "why I ripped Pamela Lee's tits off"],
    correctAnswer: 1
  },{
    question: "Only thing open is Waffle House, girl don't start with me, \
      I used the Western Union for you like it's no prob, \
      'Cause you was in college complainin' about it's no jobs, \
      But you were suckin' a nigga dick the whole time, \
      _________",
    song: "../resources/mp3/30hours.mp3",
    gif: "../resources/gif/kanye.gif",
    choices: ["but me and wifey make a movie", "like bitch why you aint got no job",
      "Well I guess a blowjob's better than no job", "I need a happy beginnin', middle and endin'"],
    correctAnswer: 2
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  var gifHolder = $('#gifHolder');
  var audio = document.createElement('audio');


  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Choose a goddamn answer first!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    // Load and play the corresponding track bite
    audio.src = questions[index].song;
    audio.play();

    // Display the question
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    // Display the questions
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    // Display the corresponding gif
    var gif_src = '<img src="'+ questions[index].gif + '">';
    gifHolder.append(gif_src);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {

    // Clear the gifHolder div for the next gif to append.
    document.getElementById('gifHolder').innerHTML = "";

    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {

    audio.pause();

    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    if (numCorrect == questions.length) {
      score.append('Goodjob Genuis.com, you got all of em. ');
      // Display the corresponding gif
      var gif_src = '<img src="../resources/gif/denzel.gif">';
      gifHolder.append(gif_src);
    }else {
      score.append('You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!!!');

       // Display the corresponding gif
       var gif_src = '<img src="../resources/gif/numbers.gif">';
       gifHolder.append(gif_src);
    }
    return score;
  }
})();
