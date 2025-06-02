// UI Element References
        const generateBtn = document.getElementById('generateBtn');
        const initialState = document.getElementById('initial-state');
        const loadingState = document.getElementById('loading-state');
        const resultState = document.getElementById('result-state');
        const errorState = document.getElementById('error-state');
        const movieTitleElem = document.getElementById('movieTitle');
        const moviePitchElem = document.getElementById('moviePitch');
        const errorMessageElem = document.getElementById('errorMessage');

        const generateLoglineBtn = document.getElementById('generateLoglineBtn');
        const loglineOutput = document.getElementById('loglineOutput');
        const loglineText = document.getElementById('loglineText');
        const loglineLoading = document.getElementById('loglineLoading');

        const generateShortSynopsisBtn = document.getElementById('generateShortSynopsisBtn');
        const shortSynopsisOutput = document.getElementById('shortSynopsisOutput');
        const shortSynopsisText = document.getElementById('shortSynopsisText');
        const shortSynopsisLoading = document.getElementById('shortSynopsisLoading');

        const generateCharacterBioBtn = document.getElementById('generateCharacterBioBtn');
        const characterBioOutput = document.getElementById('characterBioOutput');
        const characterBioText = document.getElementById('characterBioText');
        const characterBioLoading = document.getElementById('characterBioLoading');

        const suggestCharacterArcBtn = document.getElementById('suggestCharacterArcBtn');
        const characterArcOutput = document.getElementById('characterArcOutput');
        const characterArcText = document.getElementById('characterArcText');
        const characterArcLoading = document.getElementById('characterArcLoading');

        const generateTaglinesBtn = document.getElementById('generateTaglinesBtn');
        const taglinesOutput = document.getElementById('taglinesOutput');
        const taglinesList = document.getElementById('taglinesList');
        const taglinesLoading = document.getElementById('taglinesLoading');

        const suggestCastingBtn = document.getElementById('suggestCastingBtn');
        const castingOutput = document.getElementById('castingOutput');
        const castingList = document.getElementById('castingList');
        const castingLoading = document.getElementById('castingLoading');

        const generateSceneBtn = document.getElementById('generateSceneBtn');
        const sceneOutput = document.getElementById('sceneOutput');
        const sceneText = document.getElementById('sceneText');
        const sceneLoading = document.getElementById('sceneLoading');

        const suggestSoundtrackBtn = document.getElementById('suggestSoundtrackBtn');
        const soundtrackOutput = document.getElementById('soundtrackOutput');
        const soundtrackText = document.getElementById('soundtrackText');
        const soundtrackLoading = document.getElementById('soundtrackLoading');

        const suggestPlotTwistsBtn = document.getElementById('suggestPlotTwistsBtn');
        const plotTwistsOutput = document.getElementById('plotTwistsOutput');
        const plotTwistsList = document.getElementById('plotTwistsList');
        const plotTwistsLoading = document.getElementById('plotTwistsLoading');

        const generateMarketingBlurbBtn = document.getElementById('generateMarketingBlurbBtn');
        const marketingBlurbOutput = document.getElementById('marketingBlurbOutput');
        const marketingBlurbText = document.getElementById('marketingBlurbText');
        const marketingBlurbLoading = document.getElementById('marketingBlurbLoading');

        const generateSceneImageBtn = document.getElementById('generateSceneImageBtn');
        const sceneImageOutput = document.getElementById('sceneImageOutput');
        const generatedSceneImage = document.getElementById('generatedSceneImage');
        const sceneImageLoading = document.getElementById('sceneImageLoading');
        const sceneImageError = document.getElementById('sceneImageError');

        const generateMoviePosterBtn = document.getElementById('generateMoviePosterBtn');
        const moviePosterOutput = document.getElementById('moviePosterOutput');
        const moviePosterText = document.getElementById('moviePosterText');
        const moviePosterLoading = document.getElementById('moviePosterLoading');

        const suggestSequelIdeaBtn = document.getElementById('suggestSequelIdeaBtn');
        const sequelIdeaOutput = document.getElementById('sequelIdeaOutput');
        const sequelIdeaText = document.getElementById('sequelIdeaText');
        const sequelIdeaLoading = document.getElementById('sequelIdeaLoading');

        const outlinePlotPointsBtn = document.getElementById('outlinePlotPointsBtn');
        const plotPointsOutput = document.getElementById('plotPointsOutput');
        const plotPointsList = document.getElementById('plotPointsList');
        const plotPointsLoading = document.getElementById('plotPointsLoading');

        const generateDialogueSnippetBtn = document.getElementById('generateDialogueSnippetBtn');
        const dialogueSnippetOutput = document.getElementById('dialogueSnippetOutput');
        const dialogueSnippetText = document.getElementById('dialogueSnippetText');
        const dialogueSnippetLoading = document.getElementById('dialogueSnippetLoading');

        // New Soundtrack Elements
        const generateSoundtrackPreviewBtn = document.getElementById('generateSoundtrackPreviewBtn');
        const soundtrackPreviewOutput = document.getElementById('soundtrackPreviewOutput');
        const playSoundtrackBtn = document.getElementById('playSoundtrackBtn');
        const stopSoundtrackBtn = document.getElementById('stopSoundtrackBtn');
        const soundtrackPreviewLoading = document.getElementById('soundtrackPreviewLoading');
        const soundtrackPreviewError = document.getElementById('soundtrackPreviewError');

        // Tone.js related variables
        let soundtrackSynth = null;
        let soundtrackSequence = null;

        // Message Box Functionality
        const messageBox = document.getElementById('messageBox');
        const messageBoxText = document.getElementById('messageBoxText');
        const messageBoxCloseBtn = document.getElementById('messageBoxCloseBtn');

        function showMessageBox(message) {
            messageBoxText.textContent = message;
            messageBox.classList.remove('hidden');
        }

        messageBoxCloseBtn.addEventListener('click', () => {
            messageBox.classList.add('hidden');
        });

        // Gemini API Call Functions
        async function callGeminiTextAPI(prompt) {
            // In a real deployment, you would fetch this from an environment variable:
            // const apiKey = process.env.GEMINI_API_KEY;
            // Attempt to read the Gemini API key from the environment variable GEMINI_API_KEY.
            // This is essential for deployment on platforms like Vercel, Netlify, or GitHub where you'll set this variable.
            // If the variable is not found (e.g., in local development without a .env setup), it defaults to an empty string.
            // const apiKey = (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) || ""; // This will be automatically provided by the Canvas environment.
                               // For Vercel/GitHub deployment, set this as an environment variable
                               // named GEMINI_API_KEY in your Vercel project settings.
            // const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const apiUrl = '/api/proxy';

            const proxyPayload = {
              type: 'text',
              prompt: prompt,
              generationConfig: { temperature: 0.8, topK: 40, topP: 0.95 }
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(proxyPayload)
            });

            let data;
            try {
                data = await response.json();
            } catch (e) {
                const errorText = await response.text();
                throw new Error(`Proxy API returned non-JSON response or empty body: ${response.status} - ${errorText}`);
            }

            if (!response.ok) {
                // Error might be from our proxy { error: 'message', details: '...' } or from Google via proxy
                const errorMessage = data.details || (data.error && data.error.message) || data.error || `API error! status: ${response.status}`;
                throw new Error(errorMessage);
            }

            // Assuming proxy passes through Google's successful response structure
            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                 throw new Error("Invalid response structure from API or no content generated.");
            }
        }

        async function callGeminiImageAPI(prompt) {
            // In a real deployment, you would fetch this from an environment variable:
            // const apiKey = process.env.IMAGEN_API_KEY;
            // Attempt to read the Imagen API key from the environment variable IMAGEN_API_KEY.
            // This is essential for deployment on platforms like Vercel, Netlify, or GitHub where you'll set this variable.
            // If the variable is not found (e.g., in local development without a .env setup), it defaults to an empty string.
            // const apiKey = (typeof process !== 'undefined' && process.env && process.env.IMAGEN_API_KEY) || ""; // This will be automatically provided by the Canvas environment.
                               // For Vercel/GitHub deployment, set this as an environment variable
                               // named IMAGEN_API_KEY in your Vercel project settings.
            // const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
            const apiUrl = '/api/proxy';

            const proxyPayload = {
              type: 'image',
              prompt: prompt,
              parameters: { "sampleCount": 1 }
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(proxyPayload)
            });

            // Check for 401 specifically - this might now be handled by the proxy logic if proxy itself gets 401
            // However, client-side check for specific status codes if proxy passes them through can still be useful.
            // if (response.status === 401) {
            //     throw new Error("Authentication failed for Image API. Please ensure your environment is configured correctly and has access to the Imagen API.");
            // }

            let data;
            try {
                data = await response.json();
            } catch (e) {
                const errorText = await response.text();
                throw new Error(`Proxy API returned non-JSON response or empty body for image: ${response.status} - ${errorText}`);
            }

            if (!response.ok) {
                // Error might be from our proxy { error: 'message', details: '...' } or from Google via proxy
                const errorMessage = data.details || (data.error && data.error.message) || data.error || `Image API error! status: ${response.status}`;
                throw new Error(errorMessage);
            }

            // Assuming proxy passes through Google's successful response structure
            if (data.predictions && data.predictions.length > 0 && data.predictions[0].bytesBase64Encoded) {
                return `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
            } else {
                 throw new Error("Invalid image response structure from API or no image generated.");
            }
        }

        // Core Movie Idea Generation
        async function generateMovieIdea() {
            const genre = document.getElementById('genre').value;
            const character = document.getElementById('character').value;
            const object = document.getElementById('object').value;
            const setting = document.getElementById('setting').value;
            const timePeriod = document.getElementById('timePeriod').value;
            const tone = document.getElementById('tone').value;
            const conflict = document.getElementById('conflict').value;

            if (!genre && !character && !object && !setting && !timePeriod && !tone && !conflict) {
                showMessageBox('Please enter at least one element to generate a movie idea!');
                return;
            }

            initialState.classList.add('hidden');
            resultState.classList.add('hidden');
            errorState.classList.add('hidden');
            // Hide all sub-outputs when generating a new main idea
            characterBioOutput.classList.add('hidden');
            taglinesOutput.classList.add('hidden');
            loglineOutput.classList.add('hidden');
            shortSynopsisOutput.classList.add('hidden');
            characterArcOutput.classList.add('hidden');
            castingOutput.classList.add('hidden');
            sceneOutput.classList.add('hidden');
            soundtrackOutput.classList.add('hidden');
            plotTwistsOutput.classList.add('hidden');
            marketingBlurbOutput.classList.add('hidden');
            sceneImageOutput.classList.add('hidden');
            moviePosterOutput.classList.add('hidden');
            sequelIdeaOutput.classList.add('hidden');
            plotPointsOutput.classList.add('hidden');
            dialogueSnippetOutput.classList.add('hidden');
            soundtrackPreviewOutput.classList.add('hidden');


            loadingState.classList.remove('hidden');
            generateBtn.disabled = true;
            generateBtn.textContent = 'Generating...';
            generateBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Generate a movie pitch and a catchy title based on the following elements.
                The pitch should be 3-5 sentences, quirky, and intriguing.
                The title should be short, memorable, and directly related to the pitch.

                Elements:
                - Genre: ${genre || 'Any'}
                - Character: ${character ? `A character named ${character}` : 'Any'}
                - Object: ${object || 'Any'}
                - Setting: ${setting || 'Any'}
                - Time Period: ${timePeriod || 'Any'}
                - Tone/Mood: ${tone || 'Any'}
                - Core Conflict/Goal: ${conflict || 'Any'}

                Ensure the generated movie pitch explicitly uses the provided character name/description if given, and incorporates the other provided elements naturally.

                Format your response exactly as follows, with no other text before or after:
                TITLE: [Generated Title]
                PITCH: [Generated Pitch]
            `;

            try {
                const generatedText = await callGeminiTextAPI(prompt);

                let title = "Title Not Found";
                let pitch = "Pitch could not be generated from the response.";

                const lines = generatedText.split('\n');
                const titleLine = lines.find(line => line.toUpperCase().startsWith("TITLE:"));
                const pitchLine = lines.find(line => line.toUpperCase().startsWith("PITCH:"));

                if (titleLine) {
                    title = titleLine.substring(6).trim();
                }
                if (pitchLine) {
                    pitch = pitchLine.substring(6).trim();
                } else if (lines.length > 1 && !titleLine) {
                    title = lines[0];
                    pitch = lines.slice(1).join(" ").trim();
                } else {
                    pitch = generatedText;
                }

                movieTitleElem.textContent = title;
                moviePitchElem.textContent = pitch;
                resultState.classList.remove('hidden');

            } catch (error) {
                console.error('Error:', error);
                errorMessageElem.textContent = error.message || "An unknown error occurred. Please check the console and try again.";
                errorState.classList.remove('hidden');
            } finally {
                loadingState.classList.add('hidden');
                generateBtn.disabled = false;
                generateBtn.textContent = 'Generate Movie Idea';
                generateBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Generate Logline
        async function generateLogline() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentGenre = document.getElementById('genre').value;
            const currentCharacter = document.getElementById('character').value;
            const currentObject = document.getElementById('object').value;
            const currentSetting = document.getElementById('setting').value;
            const currentTimePeriod = document.getElementById('timePeriod').value;
            const currentTone = document.getElementById('tone').value;
            const currentConflict = document.getElementById('conflict').value;


            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to get a logline.');
                return;
            }

            loglineOutput.classList.remove('hidden');
            loglineText.textContent = '';
            loglineLoading.classList.remove('hidden');
            generateLoglineBtn.disabled = true;
            generateLoglineBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the following movie title and pitch, generate a concise, one-sentence logline.
                Consider these additional details for context:
                Genre: ${currentGenre || 'N/A'}
                Character: ${currentCharacter || 'N/A'}
                Object: ${currentObject || 'N/A'}
                Setting: ${currentSetting || 'N/A'}
                Time Period: ${currentTimePeriod || 'N/A'}
                Tone: ${currentTone || 'N/A'}
                Conflict: ${currentConflict || 'N/A'}

                Movie Title: ${currentTitle}
                Movie Pitch: ${currentPitch}
            `;

            try {
                const logline = await callGeminiTextAPI(prompt);
                loglineText.textContent = logline.trim();
            } catch (error) {
                console.error('Error generating logline:', error);
                loglineText.textContent = "Failed to generate logline. " + (error.message || "Please try again.");
            } finally {
                loglineLoading.classList.add('hidden');
                generateLoglineBtn.disabled = false;
                generateLoglineBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Generate Short Synopsis
        async function generateShortSynopsis() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentGenre = document.getElementById('genre').value;
            const currentCharacter = document.getElementById('character').value;
            const currentObject = document.getElementById('object').value;
            const currentSetting = document.getElementById('setting').value;
            const currentTimePeriod = document.getElementById('timePeriod').value;
            const currentTone = document.getElementById('tone').value;
            const currentConflict = document.getElementById('conflict').value;

            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to get a short synopsis.');
                return;
            }

            shortSynopsisOutput.classList.remove('hidden');
            shortSynopsisText.textContent = '';
            shortSynopsisLoading.classList.remove('hidden');
            generateShortSynopsisBtn.disabled = true;
            generateShortSynopsisBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the movie title "${currentTitle}" and pitch "${currentPitch}", generate a short synopsis (2-3 paragraphs).
                Expand on the plot, character's journey, and resolution.
                Consider these additional details for context:
                Genre: ${currentGenre || 'N/A'}
                Character: ${currentCharacter || 'N/A'}
                Object: ${currentObject || 'N/A'}
                Setting: ${currentSetting || 'N/A'}
                Time Period: ${currentTimePeriod || 'N/A'}
                Tone: ${currentTone || 'N/A'}
                Conflict: ${currentConflict || 'N/A'}
            `;

            try {
                const synopsis = await callGeminiTextAPI(prompt);
                shortSynopsisText.textContent = synopsis.trim();
            } catch (error) {
                console.error('Error generating short synopsis:', error);
                shortSynopsisText.textContent = "Failed to generate short synopsis. " + (error.message || "Please try again.");
            } finally {
                shortSynopsisLoading.classList.add('hidden');
                generateShortSynopsisBtn.disabled = false;
                generateShortSynopsisBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Generate Character Bio
        async function generateCharacterBio() {
            const currentPitch = moviePitchElem.textContent;
            const currentCharacterInput = document.getElementById('character').value;
            const currentGenre = document.getElementById('genre').value;
            const currentSetting = document.getElementById('setting').value;
            const currentTimePeriod = document.getElementById('timePeriod').value;
            const currentTone = document.getElementById('tone').value;
            const currentConflict = document.getElementById('conflict').value;


            if (!currentPitch) {
                showMessageBox('Please generate a movie idea first to get a character bio.');
                return;
            }

            characterBioOutput.classList.remove('hidden');
            characterBioText.textContent = '';
            characterBioLoading.classList.remove('hidden');
            generateCharacterBioBtn.disabled = true;
            generateCharacterBioBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the following movie pitch, generate a short (3-4 sentences) character bio for the main character.
                Focus on their personality, key traits, and a hint of their role in the story.
                ${currentCharacterInput ? `Ensure the bio is for a character named or described as "${currentCharacterInput}".` : ''}
                Consider these additional details for context:
                Genre: ${currentGenre || 'N/A'}
                Setting: ${currentSetting || 'N/A'}
                Time Period: ${currentTimePeriod || 'N/A'}
                Tone: ${currentTone || 'N/A'}
                Conflict: ${currentConflict || 'N/A'}

                Movie Pitch: ${currentPitch}
            `;

            try {
                const bio = await callGeminiTextAPI(prompt);
                characterBioText.textContent = bio.trim();
            } catch (error) {
                console.error('Error generating character bio:', error);
                characterBioText.textContent = "Failed to generate character bio. " + (error.message || "Please try again.");
            } finally {
                characterBioLoading.classList.add('hidden');
                generateCharacterBioBtn.disabled = false;
                generateCharacterBioBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Suggest Character Arc
        async function suggestCharacterArc() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentCharacter = document.getElementById('character').value;
            const currentGenre = document.getElementById('genre').value;
            const currentConflict = document.getElementById('conflict').value;
            const currentTone = document.getElementById('tone').value;

            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to suggest a character arc.');
                return;
            }

            characterArcOutput.classList.remove('hidden');
            characterArcText.textContent = '';
            characterArcLoading.classList.remove('hidden');
            suggestCharacterArcBtn.disabled = true;
            suggestCharacterArcBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the movie title "${currentTitle}" and pitch "${currentPitch}", suggest a compelling character arc for the main character.
                Describe their initial state, the inciting incident, their transformation through the conflict, and their final state.
                ${currentCharacter ? `Focus on the character "${currentCharacter}".` : ''}
                Consider these additional details for context:
                Genre: ${currentGenre || 'N/A'}
                Conflict: ${currentConflict || 'N/A'}
                Tone: ${currentTone || 'N/A'}
            `;

            try {
                const characterArc = await callGeminiTextAPI(prompt);
                characterArcText.textContent = characterArc.trim();
            } catch (error) {
                console.error('Error suggesting character arc:', error);
                characterArcText.textContent = "Failed to suggest character arc. " + (error.message || "Please try again.");
            } finally {
                characterArcLoading.classList.add('hidden');
                suggestCharacterArcBtn.disabled = false;
                suggestCharacterArcBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Generate Taglines
        async function generateTaglines() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentGenre = document.getElementById('genre').value;
            const currentTone = document.getElementById('tone').value;


            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to get taglines.');
                return;
            }

            taglinesOutput.classList.remove('hidden');
            taglinesList.innerHTML = '';
            taglinesLoading.classList.remove('hidden');
            generateTaglinesBtn.disabled = true;
            generateTaglinesBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the following movie title and pitch, generate 3 catchy and intriguing taglines for the movie.
                Each tagline should be on a new line.
                Consider these additional details for context:
                Genre: ${currentGenre || 'N/A'}
                Tone: ${currentTone || 'N/A'}

                Movie Title: ${currentTitle}
                Movie Pitch: ${currentPitch}
            `;

            try {
                const taglinesText = await callGeminiTextAPI(prompt);
                const taglinesArray = taglinesText.split('\n').filter(line => line.trim() !== '');
                taglinesArray.forEach(tagline => {
                    const li = document.createElement('li');
                    li.textContent = tagline.replace(/^- /, '').trim(); // Remove leading hyphens if present
                    taglinesList.appendChild(li);
                });
            } catch (error) {
                console.error('Error generating taglines:', error);
                const li = document.createElement('li');
                    li.textContent = "Failed to generate taglines. " + (error.message || "Please try again.");
                taglinesList.appendChild(li);
            } finally {
                taglinesLoading.classList.add('hidden');
                generateTaglinesBtn.disabled = false;
                generateTaglinesBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Suggest Casting
        async function suggestCasting() {
            const currentPitch = moviePitchElem.textContent;
            const currentCharacterInput = document.getElementById('character').value;
            const currentGenre = document.getElementById('genre').value;
            const currentTone = document.getElementById('tone').value;


            if (!currentPitch) {
                showMessageBox('Please generate a movie idea first to get casting suggestions.');
                return;
            }

            castingOutput.classList.remove('hidden');
            castingList.innerHTML = '';
            castingLoading.classList.remove('hidden');
            suggestCastingBtn.disabled = true;
            suggestCastingBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the following movie pitch and character description, suggest 3-5 actors who could play the main character.
                Consider their acting style, previous roles, and suitability for the character's traits mentioned.
                ${currentCharacterInput ? `The character is named or described as "${currentCharacterInput}".` : ''}
                Consider these additional details for context:
                Genre: ${currentGenre || 'N/A'}
                Tone: ${currentTone || 'N/A'}
                List each actor on a new line.

                Movie Pitch: ${currentPitch}
            `;

            try {
                const castingText = await callGeminiTextAPI(prompt);
                const castingArray = castingText.split('\n').filter(line => line.trim() !== '');
                castingArray.forEach(actor => {
                    const li = document.createElement('li');
                    li.textContent = actor.replace(/^- /, '').trim();
                    castingList.appendChild(li);
                });
            } catch (error) {
                console.error('Error suggesting casting:', error);
                const li = document.createElement('li');
                li.textContent = "Failed to suggest casting. " + (error.message || "Please try again.");
                castingList.appendChild(li);
            } finally {
                castingLoading.classList.add('hidden');
                suggestCastingBtn.disabled = false;
                suggestCastingBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Generate Scene Idea
        async function generateSceneIdea() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentGenre = document.getElementById('genre').value;
            const currentCharacterInput = document.getElementById('character').value;
            const currentObject = document.getElementById('object').value;
            const currentSetting = document.getElementById('setting').value;
            const currentTimePeriod = document.getElementById('timePeriod').value;
            const currentTone = document.getElementById('tone').value;
            const currentConflict = document.getElementById('conflict').value;


            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to get a scene idea.');
                return;
            }

            sceneOutput.classList.remove('hidden');
            sceneText.textContent = '';
            sceneLoading.classList.remove('hidden');
            generateSceneBtn.disabled = true;
            generateSceneBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the movie title "${currentTitle}" and pitch "${currentPitch}", and genre "${currentGenre}",
                generate a short (3-5 sentences) description of a compelling opening scene or a pivotal scene.
                ${currentCharacterInput ? `The scene should feature the character "${currentCharacterInput}".` : ''}
                Consider these additional details for context:
                Object: ${currentObject || 'N/A'}
                Setting: ${currentSetting || 'N/A'}
                Time Period: ${currentTimePeriod || 'N/A'}
                Tone: ${currentTone || 'N/A'}
                Conflict: ${currentConflict || 'N/A'}
                Describe the setting, key actions, and mood.
            `;

            try {
                const scene = await callGeminiTextAPI(prompt);
                sceneText.textContent = scene.trim();
            } catch (error) {
                console.error('Error generating scene idea:', error);
                sceneText.textContent = "Failed to generate scene idea. " + (error.message || "Please try again.");
            } finally {
                sceneLoading.classList.add('hidden');
                generateSceneBtn.disabled = false;
                generateSceneBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Suggest Soundtrack Vibe (Textual Description)
        async function suggestSoundtrackVibe() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentGenre = document.getElementById('genre').value;
            const currentTone = document.getElementById('tone').value;
            const currentSetting = document.getElementById('setting').value;
            const currentTimePeriod = document.getElementById('timePeriod').value;


            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to get soundtrack suggestions.');
                return;
            }

            soundtrackOutput.classList.remove('hidden');
            soundtrackText.textContent = '';
            soundtrackLoading.classList.remove('hidden');
            suggestSoundtrackBtn.disabled = true;
            suggestSoundtrackBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the movie title "${currentTitle}", pitch "${currentPitch}", and genre "${currentGenre}",
                suggest the overall vibe or style for the movie's soundtrack.
                Include 2-3 descriptive words and a brief explanation (2-3 sentences) of why that vibe fits.
                Consider these additional details for context:
                Tone: ${currentTone || 'N/A'}
                Setting: ${currentSetting || 'N/A'}
                Time Period: ${currentTimePeriod || 'N/A'}
            `;

            try {
                const soundtrack = await callGeminiTextAPI(prompt);
                soundtrackText.textContent = soundtrack.trim();
            } catch (error) {
                console.error('Error suggesting soundtrack vibe:', error);
                soundtrackText.textContent = "Failed to suggest soundtrack vibe. " + (error.message || "Please try again.");
            } finally {
                soundtrackLoading.classList.add('hidden');
                suggestSoundtrackBtn.disabled = false;
                suggestSoundtrackBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Suggest Plot Twists
        async function suggestPlotTwists() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentGenre = document.getElementById('genre').value;
            const currentCharacter = document.getElementById('character').value;
            const currentConflict = document.getElementById('conflict').value;
            const currentObject = document.getElementById('object').value;
            const currentSetting = document.getElementById('setting').value;
            const currentTimePeriod = document.getElementById('timePeriod').value;
            const currentTone = document.getElementById('tone').value;


            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to get plot twists.');
                return;
            }

            plotTwistsOutput.classList.remove('hidden');
            plotTwistsList.innerHTML = '';
            plotTwistsLoading.classList.remove('hidden');
            suggestPlotTwistsBtn.disabled = true;
            suggestPlotTwistsBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the movie title "${currentTitle}" and pitch "${currentPitch}", generate 2-3 unexpected plot twists.
                Consider these additional details for context:
                Genre: ${currentGenre || 'N/A'}
                Character: ${currentCharacter || 'N/A'}
                Object: ${currentObject || 'N/A'}
                Setting: ${currentSetting || 'N/A'}
                Time Period: ${currentTimePeriod || 'N/A'}
                Tone: ${currentTone || 'N/A'}
                Conflict: ${currentConflict || 'N/A'}
                List each plot twist on a new line.
            `;

            try {
                const twistsText = await callGeminiTextAPI(prompt);
                const twistsArray = twistsText.split('\n').filter(line => line.trim() !== '');
                twistsArray.forEach(twist => {
                    const li = document.createElement('li');
                    li.textContent = twist.replace(/^- /, '').trim();
                    plotTwistsList.appendChild(li);
                });
            } catch (error) {
                console.error('Error suggesting plot twists:', error);
                const li = document.createElement('li');
                li.textContent = "Failed to suggest plot twists. " + (error.message || "Please try again.");
                plotTwistsList.appendChild(li);
            } finally {
                plotTwistsLoading.classList.add('hidden');
                suggestPlotTwistsBtn.disabled = false;
                suggestPlotTwistsBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Generate Marketing Blurb
        async function generateMarketingBlurb() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentGenre = document.getElementById('genre').value;
            const currentTone = document.getElementById('tone').value;
            const currentConflict = document.getElementById('conflict').value;
            const currentSetting = document.getElementById('setting').value;
            const currentTimePeriod = document.getElementById('timePeriod').value;


            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to get a marketing blurb.');
                return;
            }

            marketingBlurbOutput.classList.remove('hidden');
            marketingBlurbText.textContent = '';
            marketingBlurbLoading.classList.remove('hidden');
            generateMarketingBlurbBtn.disabled = true;
            generateMarketingBlurbBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the movie title "${currentTitle}" and pitch "${currentPitch}", generate a short (2-3 sentences) marketing blurb.
                This blurb should be exciting, hook the audience, and capture the movie's essence.
                Consider these additional details for context:
                Genre: ${currentGenre || 'N/A'}
                Tone: ${currentTone || 'N/A'}
                Conflict: ${currentConflict || 'N/A'}
                Setting: ${currentSetting || 'N/A'}
                Time Period: ${currentTimePeriod || 'N/A'}
            `;

            try {
                const blurb = await callGeminiTextAPI(prompt);
                marketingBlurbText.textContent = blurb.trim();
            } catch (error) {
                console.error('Error generating marketing blurb:', error);
                marketingBlurbText.textContent = "Failed to generate marketing blurb. " + (error.message || "Please try again.");
            } finally {
                marketingBlurbLoading.classList.add('hidden');
                generateMarketingBlurbBtn.disabled = false;
                generateMarketingBlurbBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Generate Movie Poster Idea (Textual Description)
        async function generateMoviePosterIdea() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentGenre = document.getElementById('genre').value;
            const currentCharacter = document.getElementById('character').value;
            const currentObject = document.getElementById('object').value;
            const currentTone = document.getElementById('tone').value;
            const currentConflict = document.getElementById('conflict').value;

            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to get a movie poster idea.');
                return;
            }

            moviePosterOutput.classList.remove('hidden');
            moviePosterText.textContent = '';
            moviePosterLoading.classList.remove('hidden');
            generateMoviePosterBtn.disabled = true;
            generateMoviePosterBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the movie title "${currentTitle}" and pitch "${currentPitch}", generate a creative idea for a movie poster.
                Describe the key visual elements, color scheme, and overall mood.
                Consider these additional details for context:
                Genre: ${currentGenre || 'N/A'}
                Character: ${currentCharacter || 'N/A'}
                Object: ${currentObject || 'N/A'}
                Tone: ${currentTone || 'N/A'}
                Conflict: ${currentConflict || 'N/A'}
            `;

            try {
                const posterIdea = await callGeminiTextAPI(prompt);
                moviePosterText.textContent = posterIdea.trim();
            } catch (error) {
                console.error('Error generating movie poster idea:', error);
                moviePosterText.textContent = "Failed to generate movie poster idea. " + (error.message || "Please try again.");
            } finally {
                moviePosterLoading.classList.add('hidden');
                generateMoviePosterBtn.disabled = false;
                generateMoviePosterBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Suggest Sequel Idea
        async function suggestSequelIdea() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentGenre = document.getElementById('genre').value;
            const currentCharacter = document.getElementById('character').value;
            const currentConflict = document.getElementById('conflict').value;

            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to suggest a sequel idea.');
                return;
            }

            sequelIdeaOutput.classList.remove('hidden');
            sequelIdeaText.textContent = '';
            sequelIdeaLoading.classList.remove('hidden');
            suggestSequelIdeaBtn.disabled = true;
            suggestSequelIdeaBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the movie title "${currentTitle}" and pitch "${currentPitch}", suggest a compelling idea for a sequel.
                Outline the new conflict, how the characters have evolved, and what new elements are introduced.
                Consider these additional details for context:
                Genre: ${currentGenre || 'N/A'}
                Character: ${currentCharacter || 'N/A'}
                Conflict: ${currentConflict || 'N/A'}
            `;

            try {
                const sequelIdea = await callGeminiTextAPI(prompt);
                sequelIdeaText.textContent = sequelIdea.trim();
            } catch (error) {
                console.error('Error suggesting sequel idea:', error);
                sequelIdeaText.textContent = "Failed to suggest sequel idea. " + (error.message || "Please try again.");
            } finally {
                sequelIdeaLoading.classList.add('hidden');
                suggestSequelIdeaBtn.disabled = false;
                suggestSequelIdeaBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Outline Plot Points
        async function outlinePlotPoints() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentGenre = document.getElementById('genre').value;
            const currentCharacter = document.getElementById('character').value;
            const currentConflict = document.getElementById('conflict').value;
            const currentSetting = document.getElementById('setting').value;
            const currentTimePeriod = document.getElementById('timePeriod').value;
            const currentTone = document.getElementById('tone').value;

            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to outline plot points.');
                return;
            }

            plotPointsOutput.classList.remove('hidden');
            plotPointsList.innerHTML = '';
            plotPointsLoading.classList.remove('hidden');
            outlinePlotPointsBtn.disabled = true;
            outlinePlotPointsBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the movie title "${currentTitle}" and pitch "${currentPitch}", outline 3-5 key plot points or acts for the movie.
                Focus on major turning points and narrative progression.
                Consider these additional details for context:
                Genre: ${currentGenre || 'N/A'}
                Character: ${currentCharacter || 'N/A'}
                Conflict: ${currentConflict || 'N/A'}
                Setting: ${currentSetting || 'N/A'}
                Time Period: ${currentTimePeriod || 'N/A'}
                Tone: ${currentTone || 'N/A'}
                List each plot point on a new line, preferably numbered or bulleted.
            `;

            try {
                const plotPointsText = await callGeminiTextAPI(prompt);
                const plotPointsArray = plotPointsText.split('\n').filter(line => line.trim() !== '');
                plotPointsArray.forEach(point => {
                    const li = document.createElement('li');
                    li.textContent = point.replace(/^[*-]\s*/, '').trim(); // Remove leading bullets/hyphens
                    plotPointsList.appendChild(li);
                });
            } catch (error) {
                console.error('Error outlining plot points:', error);
                const li = document.createElement('li');
                li.textContent = "Failed to outline plot points. " + (error.message || "Please try again.");
                plotPointsList.appendChild(li);
            } finally {
                plotPointsLoading.classList.add('hidden');
                outlinePlotPointsBtn.disabled = false;
                outlinePlotPointsBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Generate Dialogue Snippet
        async function generateDialogueSnippet() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentGenre = document.getElementById('genre').value;
            const currentCharacter = document.getElementById('character').value;
            const currentTone = document.getElementById('tone').value;
            const currentConflict = document.getElementById('conflict').value;

            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to generate a dialogue snippet.');
                return;
            }

            dialogueSnippetOutput.classList.remove('hidden');
            dialogueSnippetText.textContent = '';
            dialogueSnippetLoading.classList.remove('hidden');
            generateDialogueSnippetBtn.disabled = true;
            generateDialogueSnippetBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Based on the movie title "${currentTitle}" and pitch "${currentPitch}", generate a short, impactful dialogue snippet (3-5 lines).
                Include at least two characters, and ensure the dialogue reflects the movie's genre and tone.
                Consider these additional details for context:
                Genre: ${currentGenre || 'N/A'}
                Main Character: ${currentCharacter || 'N/A'}
                Tone: ${currentTone || 'N/A'}
                Conflict: ${currentConflict || 'N/A'}
                Format the dialogue clearly with character names.
            `;

            try {
                const dialogue = await callGeminiTextAPI(prompt);
                dialogueSnippetText.textContent = dialogue.trim();
            } catch (error) {
                console.error('Error generating dialogue snippet:', error);
                dialogueSnippetText.textContent = "Failed to generate dialogue snippet. " + (error.message || "Please try again.");
            } finally {
                dialogueSnippetLoading.classList.add('hidden');
                generateDialogueSnippetBtn.disabled = false;
                generateDialogueSnippetBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // Feature: Generate Scene Image
        async function generateSceneImage() {
            const currentTitle = movieTitleElem.textContent;
            const currentPitch = moviePitchElem.textContent;
            const currentGenre = document.getElementById('genre').value;
            const currentCharacter = document.getElementById('character').value;
            const currentSetting = document.getElementById('setting').value;
            const currentTimePeriod = document.getElementById('timePeriod').value;
            const currentTone = document.getElementById('tone').value;


            if (!currentTitle || !currentPitch) {
                showMessageBox('Please generate a movie idea first to generate a scene image.');
                return;
            }

            sceneImageOutput.classList.remove('hidden');
            generatedSceneImage.classList.add('hidden'); // Hide previous image
            sceneImageError.classList.add('hidden'); // Hide previous error
            sceneImageLoading.classList.remove('hidden');
            generateSceneImageBtn.disabled = true;
            generateSceneImageBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const prompt = `
                Generate a movie scene image for a film titled "${currentTitle}" with the pitch: "${currentPitch}".
                The genre is "${currentGenre}". The main character is described as "${currentCharacter}".
                Focus on a visually striking moment that captures the essence of the movie.
                Consider these additional details for context:
                Setting: ${currentSetting || 'N/A'}
                Time Period: ${currentTimePeriod || 'N/A'}
                Tone: ${currentTone || 'N/A'}
            `;

            try {
                const imageUrl = await callGeminiImageAPI(prompt);
                generatedSceneImage.src = imageUrl;
                generatedSceneImage.classList.remove('hidden');
            } catch (error) {
                console.error('Error generating scene image:', error);
                sceneImageError.textContent = "Failed to generate image. " + (error.message || "Please try again.");
                sceneImageError.classList.remove('hidden');
            } finally {
                sceneImageLoading.classList.add('hidden');
                generateSceneImageBtn.disabled = false;
                generateSceneImageBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // New Feature: Generate Soundtrack Preview
        async function generateSoundtrackPreview() {
            const currentGenre = document.getElementById('genre').value;
            const currentTone = document.getElementById('tone').value;
            const currentTitle = movieTitleElem.textContent;

            if (!currentTitle) { // Ensure a movie idea is generated first
                showMessageBox('Please generate a movie idea first to compose a soundtrack preview.');
                return;
            }

            // Stop any currently playing soundtrack
            stopSoundtrack();

            soundtrackPreviewOutput.classList.remove('hidden');
            soundtrackPreviewError.classList.add('hidden');
            playSoundtrackBtn.classList.add('hidden');
            stopSoundtrackBtn.classList.add('hidden');
            soundtrackPreviewLoading.classList.remove('hidden');
            generateSoundtrackPreviewBtn.disabled = true;
            generateSoundtrackPreviewBtn.classList.add('opacity-50', 'cursor-not-allowed');

            try {
                // Initialize Tone.js if not already done
                if (Tone.context.state !== 'running') {
                    await Tone.start();
                    console.log('Tone.js audio context started.');
                }

                // Clean up previous synth/sequence if they exist
                if (soundtrackSynth) {
                    soundtrackSynth.dispose();
                }
                if (soundtrackSequence) {
                    soundtrackSequence.dispose();
                }

                // Determine musical parameters based on genre and tone
                let scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']; // C Major default
                let tempo = 120; // BPM
                let synthType = 'Synth'; // Default synth type
                let notes = [];
                let duration = '8n'; // default note duration

                const lowerCaseGenre = currentGenre.toLowerCase();
                const lowerCaseTone = currentTone.toLowerCase();

                if (lowerCaseGenre.includes('horror') || lowerCaseTone.includes('dark') || lowerCaseTone.includes('suspenseful')) {
                    scale = ['C4', 'Eb4', 'F4', 'Gb4', 'G4', 'Ab4', 'B4']; // C Harmonic Minor
                    tempo = 80;
                    synthType = 'DuoSynth'; // Deeper, more complex sound
                    notes = [
                        ['C3', 'G3'], ['Eb3', 'Ab3'], ['C3', 'G3'], ['F3', 'C4'],
                        ['C3', 'G3'], ['Eb3', 'Ab3'], ['C3', 'G3'], ['B2', 'F3']
                    ];
                    duration = '4n';
                } else if (lowerCaseGenre.includes('comedy') || lowerCaseTone.includes('lighthearted') || lowerCaseTone.includes('whimsical')) {
                    scale = ['C4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4']; // C Lydian (bright)
                    tempo = 140;
                    synthType = 'FMSynth'; // Brighter, bell-like
                    notes = [
                        ['C5', 'E5', 'G5'], ['F5', 'A5', 'C6'], ['G5', 'B5', 'D6'], ['C5', 'E5', 'G5'],
                        ['D5', 'F#5', 'A5'], ['G5', 'B5', 'D6'], ['C5', 'E5', 'G5'], ['F5', 'A5', 'C6']
                    ];
                    duration = '8n';
                } else if (lowerCaseGenre.includes('sci-fi') || lowerCaseTone.includes('futuristic')) {
                    scale = ['C4', 'D4', 'F4', 'G4', 'A4', 'C5']; // C Minor Pentatonic (spacey)
                    tempo = 100;
                    synthType = 'AMSynth'; // Metallic, evolving sound
                    notes = [
                        ['C4', 'G4'], ['F4', 'C5'], ['G4', 'D5'], ['C4', 'G4'],
                        ['A4', 'E5'], ['F4', 'C5'], ['G4', 'D5'], ['C4', 'G4']
                    ];
                    duration = '4n';
                } else { // Default / Neutral
                    scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']; // C Major
                    tempo = 120;
                    synthType = 'Synth';
                    notes = [
                        ['C4', 'E4', 'G4'], ['F4', 'A4', 'C5'], ['G4', 'B4', 'D5'], ['C4', 'E4', 'G4']
                    ];
                    duration = '4n';
                }

                // Create a synth
                soundtrackSynth = new Tone[synthType]().toDestination();
                soundtrackSynth.volume.value = -12; // Lower volume slightly

                // Create a sequence
                soundtrackSequence = new Tone.Sequence((time, note) => {
                    soundtrackSynth.triggerAttackRelease(note, duration, time);
                }, notes, '4n'); // '4n' means each event in the sequence is a quarter note apart

                Tone.Transport.bpm.value = tempo;
                Tone.Transport.loop = true;
                Tone.Transport.loopEnd = '2m'; // Loop every 2 measures

                playSoundtrackBtn.classList.remove('hidden');
                stopSoundtrackBtn.classList.remove('hidden');

            } catch (error) {
                console.error('Error generating soundtrack preview:', error);
                soundtrackPreviewError.textContent = "Failed to compose soundtrack. " + (error.message || "Please try again.");
                soundtrackPreviewError.classList.remove('hidden');
            } finally {
                soundtrackPreviewLoading.classList.add('hidden');
                generateSoundtrackPreviewBtn.disabled = false;
                generateSoundtrackPreviewBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        function playSoundtrack() {
            if (soundtrackSequence && Tone.context.state === 'running') {
                Tone.Transport.start();
                soundtrackSequence.start();
                playSoundtrackBtn.classList.add('hidden');
                stopSoundtrackBtn.classList.remove('hidden');
            } else {
                showMessageBox('Soundtrack not ready or audio context not running. Try generating it again.');
            }
        }

        function stopSoundtrack() {
            if (soundtrackSequence) {
                Tone.Transport.stop();
                soundtrackSequence.stop();
                Tone.Transport.cancel(); // Clear all scheduled events
                playSoundtrackBtn.classList.remove('hidden');
                stopSoundtrackBtn.classList.add('hidden');
            }
        }


        // Event Listeners
        generateBtn.addEventListener('click', generateMovieIdea);
        generateLoglineBtn.addEventListener('click', generateLogline);
        generateShortSynopsisBtn.addEventListener('click', generateShortSynopsis);
        generateCharacterBioBtn.addEventListener('click', generateCharacterBio);
        suggestCharacterArcBtn.addEventListener('click', suggestCharacterArc);
        generateTaglinesBtn.addEventListener('click', generateTaglines);
        suggestCastingBtn.addEventListener('click', suggestCasting);
        generateSceneBtn.addEventListener('click', generateSceneIdea);
        suggestSoundtrackBtn.addEventListener('click', suggestSoundtrackVibe);
        suggestPlotTwistsBtn.addEventListener('click', suggestPlotTwists);
        generateMarketingBlurbBtn.addEventListener('click', generateMarketingBlurb);
        generateMoviePosterBtn.addEventListener('click', generateMoviePosterIdea);
        suggestSequelIdeaBtn.addEventListener('click', suggestSequelIdea);
        outlinePlotPointsBtn.addEventListener('click', outlinePlotPoints);
        generateDialogueSnippetBtn.addEventListener('click', generateDialogueSnippet);
        generateSoundtrackPreviewBtn.addEventListener('click', generateSoundtrackPreview); // New event listener
        playSoundtrackBtn.addEventListener('click', playSoundtrack); // New event listener
        stopSoundtrackBtn.addEventListener('click', stopSoundtrack); // New event listener
        generateSceneImageBtn.addEventListener('click', generateSceneImage);
