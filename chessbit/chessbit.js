var input_boxes = [];
var num_elements = 256;
var num_bits = 8;
var box_width = 16;
// var saved_state = ["1","1","2","2","3","3","5","5","4","4","3","3","2","2","","","5","5","6","6","4","4","","","","","","","","","","","6","6","7","7","6","6","","","","","","","","","","","","","","","","","","","","","","","","","","","7","7","8","8","7","7","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","8","8","4","4","8","8","8","8","4","4","8","8","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","7","7","8","8","7","7","","","","","","","","","","","","","","","","","","","","","","","","","","","6","6","7","7","6","6","","","","","","","","","","","4","4","6","6","5","5","","","2","2","3","3","4","4","5","5","3","3","2","2","1","1"];
var saved_state = ["1","1","2","2","3","3","","","4","4","","","","","","","5","5","","","","","","","","","","","","","","","6","6","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","7","7","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","8","8","8","8","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","7","7","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","6","6","","","","","","","","","","","","","","","5","5","","","","","","","4","4","","","3","3","2","2","1","1"];
//var saved_state = ["1","1","2","2","3","3","4","4","5","5","6","6","7","7","8","8","4","4","5","5","6","6","7","7","8","8","1","1","2","2","3","3","6","6","7","7","8","8","1","1","2","2","3","3","4","4","5","5","","","","","","","","","","","","","","","","","7","7","8","8","2","2","5","5","3","3","4","4","6","6","1","1","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","2","2","1","1","7","7","4","4","6","6","5","5","3","3","8","8","8","8","3","3","5","5","6","6","4","4","7","7","1","1","2","2","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","1","1","6","6","4","4","3","3","5","5","2","2","8","8","7","7","","","","","","","","","","","","","","","","","5","5","4","4","3","3","2","2","1","1","8","8","7","7","6","6","3","3","2","2","1","1","8","8","7","7","6","6","5","5","4","4","8","8","7","7","6","6","5","5","4","4","3","3","2","2","1","1"];
// var saved_state = ["1","1","2","2","3","3","4","4","5","5","6","6","7","7","8","8","4","4","5","5","6","6","7","7","8","8","1","1","2","2","3","3","6","6","7","7","8","8","1","1","2","2","3","3","4","4","5","5","2","2","3","3","1","1","2","2","6","6","7","7","5","5","4","4","7","7","8","8","2","2","5","5","3","3","4","4","6","6","1","1","3","3","6","6","2","2","8","8","7","7","4","4","1","1","5","5","6","6","4","4","2","2","3","3","1","1","5","5","8","8","7","7","2","2","1","1","7","7","4","4","6","6","5","5","3","3","8","8","8","8","3","3","5","5","6","6","4","4","7","7","1","1","2","2","7","7","8","8","5","5","1","1","3","3","2","2","4","4","6","6","5","5","1","1","4","4","7","7","8","8","2","2","6","6","3","3","1","1","6","6","4","4","3","3","5","5","2","2","8","8","7","7","4","4","5","5","7","7","6","6","2","2","1","1","3","3","2","2","5","5","4","4","3","3","2","2","1","1","8","8","7","7","6","6","3","3","2","2","1","1","8","8","7","7","6","6","5","5","4","4","8","8","7","7","6","6","5","5","4","4","3","3","2","2","1","1"];
// var saved_state = [];

var focus_index = -1;
var update_colors = true;

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
        if (input_box.dirty) {
            // nop
            color = 'gray';
        } else if (transition_indices.includes(input_box.id)) {
            color = 'red';
            // input_box.dirty = true;
        } 
        if (box_id == input_box.id) {
            color = 'green';
            // input_box.dirty = true;
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
    if(box_id % 2 == 0) {
        var neighbor_box = input_boxes[box_id + 1];
        neighbor_box.val(this_box.val());
        var neighbor_symmetric_bo = input_boxes[num_elements - box_id - 2];
        neighbor_symmetric_bo.val(this_box.val());
    }
}

function get_transition_indices(input_index) {
    // given an input index, find all other indices that can be reached by flipping a single bit.
    // returns a list of all other indices that can be reached in this way
    var result = [];
    for (var bit_index = 0; bit_index < num_bits; bit_index++) {
        var mask = 1 << bit_index;
        var mask2 = num_elements - 1;
        var new_index = (input_index ^ mask) & mask2;
        result.push(new_index);
        if (new_index % 2 == 0) {
            result.push(new_index + 1);

        } else {
            result.push(new_index - 1);
        }
    }
    return result;
}

function save() {
    var result = [];
    input_boxes.forEach(function(input_box) {
        result.push(input_box.val());
    });
    console.log(JSON.stringify(result));
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
            if (row < 10) {
                row = "0" + row;
            }
            var d = $("<div></div>").text(row).css({'float': 'left', 'margin-right': '10px'});
            $('#grid').append(d);
            $('#grid').append("<div></div>");
            
        }
    }
    
	input_boxes.forEach(function(input_box) {
        input_box.focus(function() {
            on_focus(input_box.id);
        });
        input_box.change(function() {
            console.log("onChange: " + this.value);
            on_change(input_box.id);
        })
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
