$(document).ready(function () {
    // When the user submits a message
    $('#chat-form').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const query = $('#query').val().trim();
        if (!query) return; // Ignore empty inputs

        // Append user message to chat box
        $('#chat-box').append(`
            <div class="text-right">
                <p class="bg-blue-100 p-3 rounded-md mb-2 inline-block">${query}</p>
            </div>
        `);

        // Clear the input field
        $('#query').val('');

        // Scroll to the bottom of the chat box
        $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);

        // Show the thinking indicator (Loading spinner)
        $('#thinking-indicator').removeClass('hidden');

        // Send AJAX request to the backend
        $.ajax({
            url: "http://127.0.0.1:5000/study", // Replace with your backend URL
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ query }),
            success: function (response) {
                // Convert Markdown response to HTML using marked.js
                const markdownResponse = response.response; // Assume the response is in markdown format
                const htmlResponse = marked.parse(markdownResponse); // Convert to HTML

                // Append the AI response to the chat box
                $('#chat-box').append(`
                    <div class="text-left">
                        <div class="bg-gray-200 p-3 rounded-md mb-2 inline-block">${htmlResponse}</div>
                    </div>
                `);

                // Hide the thinking indicator (Spinner) once response is received
                $('#thinking-indicator').addClass('hidden');

                // Scroll to the bottom of the chat box after response
                $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
            },
            error: function (xhr, status, error) {
                // Handle error
                $('#chat-box').append(`
                    <div class="text-left">
                        <p class="bg-red-200 p-3 rounded-md mb-2 inline-block">Error fetching response. Please try again.</p>
                    </div>
                `);

                // Hide the thinking indicator (Spinner) in case of error
                $('#thinking-indicator').addClass('hidden');

                // Scroll to the bottom of the chat box after error
                $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
            }
        });
    });
});
