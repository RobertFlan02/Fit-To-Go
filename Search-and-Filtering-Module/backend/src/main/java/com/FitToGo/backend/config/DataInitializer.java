package com.FitToGo.backend.config;

import com.FitToGo.backend.models.Exercise;
import com.FitToGo.backend.models.Tag;
import com.FitToGo.backend.models.User;
import com.FitToGo.backend.repositories.ExerciseRepository;
import com.FitToGo.backend.repositories.TagRepository;
import com.FitToGo.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Only seed exercises if none exist.
        if (exerciseRepository.count() > 0) {
            System.out.println("Exercises already exist. Skipping seeding.");
            return;
        }

        // Seed Users if table is empty.
        if (userRepository.count() == 0) {
            User alice = new User("Alice");
            User bob = new User("Bob");
            User charlie = new User("Charlie");
            userRepository.saveAll(Arrays.asList(alice, bob, charlie));
        }

        // Seed Tags if table is empty.
        if (tagRepository.count() == 0) {
            Tag biceps = new Tag("Biceps");
            Tag chest = new Tag("Chest");
            Tag legs = new Tag("Legs");
            Tag shoulders = new Tag("Shoulders");
            Tag triceps = new Tag("Triceps");
            Tag back = new Tag("Back");
            Tag abs = new Tag("Abs");
            tagRepository.saveAll(Arrays.asList(biceps, chest, legs, shoulders, triceps, back, abs));
        }

        // Retrieve persisted users.
        User alice = userRepository.findByName("Alice").orElseThrow();
        User bob = userRepository.findByName("Bob").orElseThrow();
        User charlie = userRepository.findByName("Charlie").orElseThrow();

        // Retrieve persisted tags.
        Tag persistedBiceps = tagRepository.findByName("Biceps").orElseThrow();
        Tag persistedChest = tagRepository.findByName("Chest").orElseThrow();
        Tag persistedLegs = tagRepository.findByName("Legs").orElseThrow();
        Tag persistedShoulders = tagRepository.findByName("Shoulders").orElseThrow();
        Tag persistedTriceps = tagRepository.findByName("Triceps").orElseThrow();
        Tag persistedBack = tagRepository.findByName("Back").orElseThrow();
        Tag persistedAbs = tagRepository.findByName("Abs").orElseThrow();

        // Create Exercises using managed (persisted) User and Tag objects.
        Exercise exercise1 = new Exercise(
            "Bicep Curl",
            "https://example.com/images/bicep_curl.jpg",
            "Stand with your feet shoulder-width apart holding dumbbells. Keep your elbows close and curl the weights while contracting your biceps.",
            alice,
            150
        );
        exercise1.addTag(persistedBiceps);

        Exercise exercise2 = new Exercise(
            "Chest Press",
            "https://example.com/images/chest_press.jpg",
            "Lie on a flat bench and press a barbell or dumbbells upward until your arms are extended, then lower slowly while engaging your chest muscles.",
            bob,
            200
        );
        exercise2.addTag(persistedChest);

        Exercise exercise3 = new Exercise(
            "Leg Press",
            "https://example.com/images/leg_press.jpg",
            "Sit on the leg press machine with your feet shoulder-width apart. Lower the safety bars, press the platform away by extending your knees, and then return slowly.",
            charlie,
            180
        );
        exercise3.addTag(persistedLegs);

        Exercise exercise4 = new Exercise(
            "Shoulder Press",
            "https://example.com/images/shoulder_press.jpg",
            "Using a pair of dumbbells, press them overhead from shoulder height until your arms are fully extended, then lower them back down slowly.",
            alice,
            170
        );
        exercise4.addTag(persistedShoulders);

        Exercise exercise5 = new Exercise(
            "Tricep Extension",
            "https://example.com/images/tricep_extension.jpg",
            "Hold a dumbbell with both hands overhead, keep your elbows close to your head, lower the weight behind you, and then extend back up.",
            bob,
            130
        );
        exercise5.addTag(persistedTriceps);

        Exercise exercise6 = new Exercise(
            "Pull-Up",
            "https://example.com/images/pull_up.jpg",
            "Grab a pull-up bar with an overhand grip, pull your body upward until your chin is above the bar, and lower back down with control.",
            charlie,
            220
        );
        exercise6.addTag(persistedBack);

        Exercise exercise7 = new Exercise(
            "Crunches",
            "https://example.com/images/crunches.jpg",
            "Lie on your back with your knees bent, place your hands behind your head, and lift your shoulders off the ground using your abdominal muscles.",
            alice,
            140
        );
        exercise7.addTag(persistedAbs);

        exerciseRepository.saveAll(Arrays.asList(exercise1, exercise2, exercise3, exercise4, exercise5, exercise6, exercise7));

        System.out.println("Data seeding complete.");
    }
}