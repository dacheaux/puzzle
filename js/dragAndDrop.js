
var startModal = document.getElementById("modal-1");
var endModal = document.getElementById("modal-2");

var overlayEnd = document.querySelector('.md-overlay');

$(document).ready(function() {
    classie.add(startModal, 'md-show');
});

closeStart = startModal.querySelector('.md-close');
restart = endModal.querySelector('.md-close');

closeStart.addEventListener('click', function(ev) {
    ev.stopPropagation();
    classie.remove(startModal, 'md-show');
});

var $figures = $('#straightLine, #figureG, #figureZ, #figureW, #cube, #space, #oppositeG');

restart.addEventListener('click', function(ev) {
    ev.stopPropagation();
    classie.remove(endModal, 'md-show');
    classie.remove(overlayEnd, 'overlayChanged');
    $figures.animate({
        left: 0,
        top: 0
    });
});

var startLeft, startTop, endLeft, endTop, meantimeLeft, meantimeTop;
var num = 0;
var items = [false, false, false, false, false, false, false];

$figures.draggable({
    grid: [40, 40],
    containment: ".middle",
    opacity: 0.65,
    revert:
            function(event, ui) {
                $(this).data("uiDraggable").originalPosition = {
                    top: 0,
                    left: 0
                };
                return !event;
            },
    preventCollision: true,
    cursor: "move",
    start: function(event, ui) {
        startLeft = $(this).offset().left, startTop = $(this).offset().top;
        ui.helper.data('dropped', false);
        if (ui.helper.data('id') === undefined) {
            ui.helper.data('id', num++);
        }
    },
    drag: function() {
        meantimeLeft = $(this).offset().left, meantimeTop = $(this).offset().top;
    },
    stop: function(event, ui) {
        endLeft = $(this).offset().left;
        endTop = $(this).offset().top;
        var leftDiff = Math.abs(endLeft - startLeft);
        var topDiff = Math.abs(endTop - startTop);

        if (((1 <= leftDiff) && (leftDiff <= 79)) || ((1 <= topDiff) && (topDiff <= 79))) {
            ui.helper.data('dropped', false);
            $(this).animate({
                left: 0,
                top: 0
            });
        }

        setIfIsDropped(ui);

        var final = isDone();

        if (final === true) {
            resetItems();
            classie.add(endModal, 'md-show');
            classie.add(overlayEnd, 'overlayChanged');
        }
    }

});

function setIfIsDropped(ui) {
    for (var i = 0; i < items.length; i++) {
        if (ui.helper.data('dropped') === true) {
            items[ui.helper.data('id')] = true;
        } else if (ui.helper.data('dropped') === false) {
            items[ui.helper.data('id')] = false;
        }
    }
}

function isDone() {
    var isSet = true;
    for (var u = 0; u < items.length; u++) {
        if (items[u] === false) {
            isSet = false;
        }
    }
    return isSet;
}

function resetItems() {
    for (var i = 0; i < items.length; i++) {
        items[i] = false;
    }
}

$("#table").droppable({
    tolerance: "fit",
    activeClass: "active",
    drop: function(event, ui) {
        ui.helper.data('dropped', true);
    }

});

$("#straightLine").draggable({
    multipleCollisionInteractions:
            [
                {collider: ".straightLineCollider", obstacle: ".cubeCollider", preventCollision: true},
                {collider: ".straightLineCollider", obstacle: ".wCollider", preventCollision: true},
                {collider: ".straightLineCollider", obstacle: ".gCollider", preventCollision: true},
                {collider: ".straightLineCollider", obstacle: ".zCollider", preventCollision: true},
                {collider: ".straightLineCollider", obstacle: ".oppositeGCollider", preventCollision: true},
                {collider: ".straightLineCollider", obstacle: ".spaceCollider", preventCollision: true}
            ]
});

$("#figureG").draggable({
    multipleCollisionInteractions:
            [
                {collider: ".gCollider", obstacle: ".cubeCollider", preventCollision: true},
                {collider: ".gCollider", obstacle: ".wCollider", preventCollision: true},
                {collider: ".gCollider", obstacle: ".straightLineCollider", preventCollision: true},
                {collider: ".gCollider", obstacle: ".zCollider", preventCollision: true},
                {collider: ".gCollider", obstacle: ".oppositeGCollider", preventCollision: true},
                {collider: ".gCollider", obstacle: ".spaceCollider", preventCollision: true}
            ]
});

$("#cube").draggable({
    multipleCollisionInteractions:
            [
                {collider: ".cubeCollider", obstacle: ".gCollider", preventCollision: true},
                {collider: ".cubeCollider", obstacle: ".wCollider", preventCollision: true},
                {collider: ".cubeCollider", obstacle: ".straightLineCollider", preventCollision: true},
                {collider: ".cubeCollider", obstacle: ".zCollider", preventCollision: true},
                {collider: ".cubeCollider", obstacle: ".oppositeGCollider", preventCollision: true},
                {collider: ".cubeCollider", obstacle: ".spaceCollider", preventCollision: true}
            ]
});


$("#figureZ").draggable({
    multipleCollisionInteractions:
            [
                {collider: ".zCollider", obstacle: ".gCollider", preventCollision: true},
                {collider: ".zCollider", obstacle: ".wCollider", preventCollision: true},
                {collider: ".zCollider", obstacle: ".straightLineCollider", preventCollision: true},
                {collider: ".zCollider", obstacle: ".cubeCollider", preventCollision: true},
                {collider: ".zCollider", obstacle: ".oppositeGCollider", preventCollision: true},
                {collider: ".zCollider", obstacle: ".spaceCollider", preventCollision: true}
            ]
});

$("#figureW").draggable({
    multipleCollisionInteractions:
            [
                {collider: ".wCollider", obstacle: ".gCollider", preventCollision: true},
                {collider: ".wCollider", obstacle: ".zCollider", preventCollision: true},
                {collider: ".wCollider", obstacle: ".straightLineCollider", preventCollision: true},
                {collider: ".wCollider", obstacle: ".cubeCollider", preventCollision: true},
                {collider: ".wCollider", obstacle: ".oppositeGCollider", preventCollision: true},
                {collider: ".wCollider", obstacle: ".spaceCollider", preventCollision: true}
            ]
});


$(".space").draggable({
    multipleCollisionInteractions:
            [
                {collider: ".spaceCollider", obstacle: ".gCollider", preventCollision: true},
                {collider: ".spaceCollider", obstacle: ".zCollider", preventCollision: true},
                {collider: ".spaceCollider", obstacle: ".straightLineCollider", preventCollision: true},
                {collider: ".spaceCollider", obstacle: ".cubeCollider", preventCollision: true},
                {collider: ".spaceCollider", obstacle: ".oppositeGCollider", preventCollision: true},
                {collider: ".spaceCollider", obstacle: ".wCollider", preventCollision: true}
            ]
});

$("#oppositeG").draggable({
    multipleCollisionInteractions:
            [
                {collider: ".oppositeGCollider", obstacle: ".gCollider", preventCollision: true},
                {collider: ".oppositeGCollider", obstacle: ".zCollider", preventCollision: true},
                {collider: ".oppositeGCollider", obstacle: ".straightLineCollider", preventCollision: true},
                {collider: ".oppositeGCollider", obstacle: ".cubeCollider", preventCollision: true},
                {collider: ".oppositeGCollider", obstacle: ".spaceCollider", preventCollision: true},
                {collider: ".oppositeGCollider", obstacle: ".wCollider", preventCollision: true}
            ]
});



