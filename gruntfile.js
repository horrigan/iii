module.exports = function (grunt) {

	grunt.initConfig({
		connect: {
			local: {
				options: {
					port: 8082,
					base: './app',
					hostname: "*",
					keepalive: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
};