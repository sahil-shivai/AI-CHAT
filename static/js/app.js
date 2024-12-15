$(document).ready(function () {
    $('#chat-form').on('submit', function (e) {
        e.preventDefault();
        
        const query = $('#query').val().trim();
        if (!query) return;

        $('#chat-box').append(`
            <div class="text-right mb-2">
                <p class="bg-blue-100 p-3 rounded-md mb-2 inline-block">${query}</p>
            </div>
        `);

        $('#query').val('');
        $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
        $('#thinking-indicator').removeClass('hidden');

        $.ajax({
            url: "http://127.0.0.1:5000/study", 
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ query }),
            success: function (response) {
                const markdownResponse = response.response;
                const htmlResponse = marked.parse(markdownResponse);

                $('#chat-box').append(`
                    <div class="text-left">
                        <div class="bg-gray-200 p-3 rounded-md mb-2 inline-block">${htmlResponse}</div>
                    </div>
                `);

                $('#thinking-indicator').addClass('hidden');
                $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
            },
            error: function () {
                $('#chat-box').append(`
                    <div class="text-left">
                        <p class="bg-red-200 p-3 rounded-md mb-2 inline-block">Error fetching response. Please try again.</p>
                    </div>
                `);
                $('#thinking-indicator').addClass('hidden');
                $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
            }
        });
    });
});
