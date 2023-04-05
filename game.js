var buttonColours = ["red", "blue", "green", "yellow"];
//tablica z kolejnymi kolorami losowanymi przez program, tablica gry
var gamePattern = []; 
//tablica z kolorami wybranymi przez użytkownika, tablica użytkownika 
var userClickedPattern = [];
//zmienna określjąca, czy ktoś przycisnął jakikolwiek przycisk na klawaturze zaczynający nową grę
var started = false;
//numer aktualnego levelu
var level = 0;

//actions when user clicks button
$(".btn").click(function() {
    //przypisz do zmiennej kolor wybranyego przez użytkownika przycisku, ich id jest ich kolorem
    var userChosenColour = $(this).attr("id");
    //przepisz kliknięty przez użytkonika kolor na koniec tablicy użytkownika
    userClickedPattern.push(userChosenColour);
    //wywołaj funkcję, która puszcza dźwięk odpowiedniego przycisku (w zależności od tego któy kliknięto)
    playSound(userChosenColour);
    //wywołaj funkcję animacji przyciśnięcia przycisku (dodaje i usuwa klasę przycisku pressed)
    animatePress(userChosenColour);
    //wywołaj funkcję sprawdzającą, czy użytkownik wcisnął poprawny kolor, jeśli nie przerwij gręi zacznij od nowa 
    checkAnswer(userClickedPattern.length-1);

});

//sprawdzenie czy na początku gry wciśnięto dowolny klawisz zaczynający grę 
$(document).keydown(function(){
    if(!started){
    //jeśłi wciśnięto klawisz po raz pierwszy (zmienna started ma wartość false) zmień tytuł na level 1 (nextSequence zmienia level na 1)
    $("#level-title").text("Level "+level);
    //wywołaj funkcję next sequence i przejdź do nastęnego levelu
    nextSequence();
    //zmień started na false, jeśłi gra trwa to przyciśnięcie przycisku klawiatury jej nie przerywa ani nic nie robi
    started = true;
    };
});

//funkcja przenosząca użytkownika na kolejny level
function nextSequence() {
    //zerowanie tablicy użytkownika, musi wyklikać taką samą sekwencję jaka jest zapisana w tablicy gry
    userClickedPattern = [];
    //losowanie koloru przez gręi przypisanie jej do nowej zmiennej 
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    //dodanie nowo wylosowanego koloru na koniec tablicy gry
    gamePattern.push(randomChosenColour);
    //wywołanie animacji przyciemniania i rozjaśniania wybranego przezx program przycisku
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //wywołanie funkcji określonego dzwięku gdy program wybierze kolejny kolor 
    playSound(randomChosenColour);
    //zwiększ level o 1
    level++;
    //zmień tytuł na odpowiedni level
    $("#level-title").text("Level "+level);
}

//funkcja wybierająca okreśłony dźwięk
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//funkcja wywołująca animację klikniętego przez użytkownika przycisku
function animatePress (currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){$("."+currentColour).removeClass("pressed");}, 100);
}

//funkcja sprawdzająca poprawność odpowiedzi użytkownika 
function checkAnswer(currentLevel){
    //sprawdzenie czy ostatni wybór użytkownika zgadza się z ostatnim losowym wyborem programu
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        //niepotrzebne, sprawdzenie co wyświetla się w konsoli
        console.log("success");
        //jeśli wybór użytkownika jest ok i długość tablicy użytkownika jest równa długości tablicy gry wywołaj funkcję przenosząca 
        //użytkownia do następnego poziomu, z opóźnieniem 1s  
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    //jeśli użytkonik się pomylił i jego ostatni wybór nie zgadza sięz ostatnim elementem tablicy gry
    else{
        //niepotrzebne, sprawdzenie co wyświetla się w konsoli
        console.log("wrong");
        //zmiana koloru strony na czerwony, czerowne mignięcie
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");}, 200);
        //puszczenie dźwięku złego wyboru
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        //zmiana tytułu na game over
        $("#level-title").text("Game Over, Press Any Key To Restart");
        //wywołanie funkcji zaczynającej grę od nowa 
        startOver();
    }
}

//funkcja zaczynająca grę od nowa
function startOver(){
    //zmienna started ma wartość false, więc każde kliknięcie klawiatury rozpocznie grę
    started = false;
    //wracamy na poziom 0, czekamy na kliknięcie żbey przejść na poziom 1
    level = 0;
    //zerujemy tablicę gry, pierwszy element zostanie wylosowany po naciśńięciu przycisku 
    gamePattern = [];
}


