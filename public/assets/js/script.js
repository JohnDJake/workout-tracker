const speed = 500;

$(() => {
    const $submit = $("#submit");
    const modal = M.Modal.init(document.querySelector("#workout-modal"));

    $.get("/api").then(workouts => {
        workouts.forEach(workout => {
            $("<div>")
                .data("id", workout._id)
                .append($("<p>").text((new Date(workout.date)).toDateString()))
                .appendTo($("#workouts"))
                .append($("<button>").addClass("view-workout btn waves-effect waves-light").text("View"))
                .append($("<button>").addClass("add-to-workout btn waves-effect waves-light").text("Add exercises"))
        });

        $(".view-workout").on("click", event => {
            $.get(`/api/${$(event.target).parent().data("id")}`).then(({ exercises }) => {
                $("#workout-modal-content")
                    .empty()
                    .append(exercises.map(exercise => {
                        const $exercise = $("<div>")
                            .addClass("row")
                            .append($("<div>").addClass("divider col s12"))
                            .append($("<p>").text(`Name: ${exercise.name}`))
                            .append($("<p>").text(`Duration: ${exercise.duration} minutes`))
                            .append($("<p>").text(`Type: ${exercise.type}`));
                        if (exercise.distance) $exercise.append($("<p>").text(`Distance: ${exercise.distance} miles`));
                        if (exercise.weight) $exercise.append($("<p>").text(`Weight: ${exercise.weight} lbs.`));
                        if (exercise.sets) $exercise.append($("<p>").text(`Sets: ${exercise.sets}`));
                        if (exercise.reps) $exercise.append($("<p>").text(`Reps: ${exercise.reps}`));
                        return $exercise;
                    }));
                modal.open();
            });
        });
        
        $(".add-to-workout").on("click", event => {
            $submit.data("id", $(event.target).parent().data("id"));
            $("#new-workout-div").hide(speed);
            $("#exercise-form-div").show(speed);
        });
    });

    $("#new-workout").on("click", () => {
        $.post("/api").then(data => {
            $submit.data("id", data._id);
            $("#new-workout-div").hide(speed);
            $("#exercise-form-div").show(speed);
        });
    });

    $("select[name=type]").on("change", event => {
        const $type = $(event.target);
        const $form = $type.parents(".exercise-form");
        $form.find(".cardio-form,.resistance-form").hide(speed);
        switch ($type.val()) {
            case "cardio":
                $form.find(".cardio-form").show(speed);
                break;
            case "resistance":
                $form.find(".resistance-form").show(speed);
                break;
        }
    });

    let selects = M.FormSelect.init(document.querySelectorAll("select"));

    $("#more-exercise").on("click", () => {
        selects[0].destroy();
        const newForm = $(".exercise-form").first().clone(true).appendTo("#forms");
        newForm.find(".cardio-form,.resistance-form").hide();
        newForm.find("input").each((i, input) => $(input).val(""));
        M.updateTextFields();
        selects = M.FormSelect.init(document.querySelectorAll("select"));
    });

    $submit.on("click", () => {
        const exercises = [];
        $(".exercise-form").each((i, form) => {
            const $form = $(form);
            const exercise = {
                name: $form.find("[name=name]").val(),
                duration: $form.find("[name=duration]").val(),
                type: $form.find("[name=type]").val()
            };
            switch (exercise.type) {
                case "cardio":
                    exercise.distance = $form.find("[name=distance]").val();
                    break;
                case "resistance":
                    exercise.weight = $form.find("[name=weight]").val();
                    exercise.sets = $form.find("[name=sets]").val();
                    exercise.reps = $form.find("[name=reps]").val();
                    break;
            }
            exercises.push(exercise);
        });
        $.post(`/api/${$submit.data("id")}`, { exercises }).then(() => location.reload()).fail(err => console.log(err));
    });
});