const speed = 500;

$(() => {
    const $submit = $("#submit");

    $.get("/api").then(workouts => {
        workouts.forEach(workout => {
            const workoutDiv = $("<div>");
            workoutDiv.data("id", workout._id);
            workoutDiv.append($("<p>").text((new Date(workout.date)).toDateString()));
            workoutDiv.appendTo($("#workouts"));
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