$(document).ready(function() {

    var notes = [],
        count = 0;

    function listRefresh() {
        $('#list').empty();

        for (var i = 0; i < notes.length; i++) {
            var title = notes[i].title,
                date = notes[i].date,
                dateString,
                month,
                element;

            month = date.getMonth() + 1;
            dateString = date.getDate() + "/" + month + "/" + date.getFullYear();

            element = $('<li data-id="' + notes[i].id + '" data-title="' + notes[i].title + '">');

            element.append($('<div class="div-title">').text(title));
            element.append($('<div class="div-date">').text(dateString));

            $('#list').append(element);
        }
    }

    //DISPLAY LIST OF NOTES
    $('#list').on('click', 'li', function() {
        var id = $(this).data('id'),
            description = '',
            title = $(this).data('title');


        console.log("title: ", title)
        $('#list li.selected').removeClass('selected');
        $(this).addClass('selected');

        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id === id) {
                description = notes[i].description;
            }
        }

        $('#edit-title').val(title);
        $('#edit-description').val(description);
        $('#div-edit').removeClass('hide');
    })

    //SUBMIT NOTES
    $('#submit').on('click', function() {
        var title = $('#title').val(),
            description = $('#description').val(),
            date = new Date();

        if (title === "") {
            alert("Please enter a title for the note");
        } else {
            notes.push({
                id: count,
                title: title,
                description: description,
                date: date
            })
        }

        count++;

        $('#description').val('');
        $('#title').val('');

        listRefresh();
    })

    //SAVE NOTES
    $('#save').on('click', function() {
        var id = $('#list li.selected').data('id'),
            title = $('#edit-title').val(),
            description = $('#edit-description').val();

        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id === id) {
                notes[i].title = title;
                notes[i].description = description;
                break;
            }
        }

        listRefresh();

        $('#list li[data-id="' + id + '"]').addClass('selected');

    })

    //CANCEL NOTEs
    $('#cancel').on('click', function() {
        $('#div-edit').addClass('hide');
        $('#list li.selected').removeClass('selected');
    })

    //REMOVE NOTES
    $('#remove').on('click', function() {
        var id = $('#list li.selected').data('id');

        var r = confirm('Are you sure you want to remove this note?');
        if (r) {
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id === id) {
                    notes.splice(i, 1);
                    break;
                }
            }
            listRefresh();
            $('#div-edit').addClass('hide');
        }

    })

});