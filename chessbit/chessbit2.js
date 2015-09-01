var input_boxes = [];
var num_elements = 128;
var num_bits = 8;
var box_width = 8;
var saved_state = ['1',
 '2',
 '4',
 '3',
 '8',
 '4',
 '6',
 '5',
 '3',
 '5',
 '7',
 '6',
 '2',
 '7',
 '1',
 '8',
 '5',
 '6',
 '8',
 '7',
 '7',
 '1',
 '3',
 '2',
 '4',
 '8',
 '2',
 '1',
 '6',
 '3',
 '5',
 '4',
 '6',
 '7',
 '2',
 '8',
 '5',
 '3',
 '7',
 '1',
 '8',
 '1',
 '5',
 '4',
 '4',
 '6',
 '3',
 '2',
 '3',
 '4',
 '1',
 '5',
 '2',
 '8',
 '4',
 '6',
 '7',
 '2',
 '6',
 '3',
 '1',
 '5',
 '8',
 '7',
 '7',
 '8',
 '5',
 '1',
 '3',
 '6',
 '2',
 '7',
 '6',
 '4',
 '8',
 '2',
 '5',
 '1',
 '4',
 '3',
 '2',
 '3',
 '6',
 '4',
 '4',
 '5',
 '1',
 '8',
 '1',
 '7',
 '3',
 '5',
 '8',
 '2',
 '7',
 '6',
 '4',
 '5',
 '3',
 '6',
 '1',
 '2',
 '8',
 '4',
 '2',
 '3',
 '1',
 '7',
 '7',
 '8',
 '6',
 '5',
 '8',
 '1',
 '7',
 '2',
 '6',
 '7',
 '5',
 '3',
 '5',
 '6',
 '4',
 '8',
 '3',
 '4',
 '2',
 '1'];

var focus_index = -1;
var update_colors = true;

var rows = "ABCDEFGHIJKLMNOP";
function on_focus(box_id) {
    if(!update_colors) {
        return;
    }
    var transition_indices = get_transition_indices(box_id);
    highlight_possible_boxes(transition_indices, box_id);
    show_possible_numbers(transition_indices);
    focus_index = box_id;
}

function highlight_possible_boxes(transition_indices, box_id) {
    input_boxes.forEach(function(input_box) {
        var color = 'white';
        if (transition_indices.includes(input_box.id)) {
            color = 'red';
        } 
        if (box_id == input_box.id) {
            color = 'green';
        }
        input_box.css({'background-color': color});
    });
}

function show_possible_numbers(transition_indices) {
    var possible_indices = [];
    for(var i = 0; i < num_bits; i++) {
        possible_indices.push(i + 1);
    }
    input_boxes.forEach(function(input_box) {
        if (transition_indices.includes(input_box.id)) {
            var val = input_box.val();
            for(var j = 0; j < possible_indices.length; j++) {
                if (val == possible_indices[j]) {
                    possible_indices.splice(j, 1);
                } 
            }
        }
    });
    $("#possible_numbers").text("candidates: " + possible_indices.join(","))

}


function on_change(box_id) {
    var symmetric_box = input_boxes[num_elements - box_id - 1];
    var this_box = input_boxes[box_id];
    symmetric_box.val(this_box.val());
}

function get_transition_indices(input_index) {
    // given an input index, find all other indices that can be reached by flipping a single bit.
    // returns a list of all other indices that can be reached in this way
    var result = [input_index];
    for (var bit_index = 0; bit_index < num_bits; bit_index++) {
        var mask = 1 << bit_index;
        var mask2 = num_elements - 1;
        var new_index = (input_index ^ mask) & mask2;
        console.log(input_index, new_index);
        result.push(new_index);
    }
    return result;
}

function save() {
    var result = [];
    input_boxes.forEach(function(input_box) {
        if(input_box.val()) {
            result.push(input_box.val());    
        } else {
            result.push("0");
        }
        
    });
    console.log(JSON.stringify(result));
    console.log(result.join(""));
}

function update_ui() {
    $("#color_update_status").text("Update colors: " + update_colors);
}

$().ready(function() {
    for (var i = 0; i < num_elements; i++) {
        var input_box = $("<input class='my_input' type='text'></input>");
        input_box.id = i;
        if (saved_state[i]) {
            input_box.val(saved_state[i]);
        }
        var local_input_copy = input_box;
        input_boxes.push(input_box);
        $('#grid').append(input_box);
        if ((i + 1) % box_width == 0)  {
            var row = Math.floor(i / box_width);
            var d = $("<div></div>").text(rows[row]).css({'font-family':'monospace', 'float': 'left', 'margin-right': '10px'});
            $('#grid').append(d);
            $('#grid').append("<div></div>");
            
        }
    }
    
	input_boxes.forEach(function(input_box) {
        input_box.focus(function() {
            on_focus(input_box.id);
        });
        input_box.change(function() {
            on_change(input_box.id);
        });
    });
    
    $('.my_input').css({'width': '10px'})

    $("#save").click(function() { save() });
});

$(document).keydown(function(e) {
    console.log(e.which);
    var next_focus_index = focus_index;
    switch(e.which) {
        case 37: // left
        next_focus_index = focus_index - 1;
        break;

        case 38: // up
        next_focus_index = focus_index - box_width;
        break;

        case 39: // right
        next_focus_index = focus_index + 1;
        break;

        case 40: // down
        next_focus_index = focus_index + box_width;
        break;

        case 27: // esc
        update_colors = !update_colors;
        update_ui();
        break;

        default: return; // exit this handler for other keys
    }
    focus_index = next_focus_index;
    e.preventDefault(); // prevent the default action (scroll / move caret)
    if(next_focus_index >= 0 && next_focus_index < input_boxes.length) {
        input_boxes[focus_index].blur();
        input_boxes[next_focus_index].focus();
    }
});
