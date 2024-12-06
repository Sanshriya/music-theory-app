# Insert data into the tables

USE music_theory_app;

-- Insert topics
INSERT INTO topics (name) VALUES 
('Cadences'),
('Chords'),
('Intervals'),
('Music Terminology');

-- Insert questions and answers
INSERT INTO questions (question, answer, topic_id) VALUES
('What is a perfect cadence?', 'V - I, dominant to tonic, V to I, dominant - tonic', 1),
('What is a plagal cadence?', 'IV - I, subdominant to tonic, IV to I, subdominant - tonic', 1),
('Which chord does an imperfect cadence end on?', 'V, dominant', 1),
('What is an interrupted cadence?', 'V - VI, dominant to submediant, V to VI, dominant - submediant', 1),
('Which cadence moves from a major chord to a minor chord?', 'Interrupted cadence', 1),

('What notes make up an F major triad?', 'F, A, C', 2),
('Which chord is the subdominant in the key of D minor?', 'G minor', 2),
('Which chord is the supertonic in the key of A major?', 'B minor', 2),
('In order, what are the notes in the 1st inversion of an E minor chord?', 'G, B, E', 2),
('Which chord is the dominant in the key of Bb major?', 'F major', 2),

('What is the interval from D up to G?', 'Perfect 4th', 3),
('What is the interval from B up to A♭?', 'Diminished 7th', 3),
('What is the interval from F♯ up to A?', 'Minor 3rd', 3),
('What is the interval from E♭ up to C?', 'Major 6th', 3),
('What is the interval from C up to G♯?', 'Augmented 5th', 3),

('What does "scherzando" mean?', 'Playfully', 4),
('What does "leggiero" mean?', 'Lightly', 4),
('What does "con brio" mean?', 'With vigour', 4),
('What does "poco a poco" mean?', 'Little by little', 4),
('What does "subito" mean?', 'Suddenly', 4);