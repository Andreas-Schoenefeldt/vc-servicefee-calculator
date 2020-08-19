import $ from 'jquery';

// make sure jQuery is available as global variable
if (typeof(window.jQuery) !== "undefined") {
    console.log('Using existing jQuery');
    $ = window.jQuery;
} else {
    console.log('Putting new jQuery');
    window.jQuery = $;
}

export default $;