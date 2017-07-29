var expect = require('chai').expect
var commands = require('../commands')

describe('Commands', function() {
    describe('Valid commands file', function() {
        beforeEach(function() {
            commands.init('test/testCommands.yml')
        })
        it('should convert parsed file to a string', function() {
            expect(commands.toString()).to.equal('{"list":"ls -l","ifconfig":"ifconfig","go_home":"cd ~","go_root":"cd /"}')
        })
        it('should accept valid commands', function() {
            expect(commands.isValid('list')).to.equal(true)
        })
        it('should reject invalid commands', function() {
            expect(commands.isValid('fake')).to.equal(false)
            expect(commands.isValid('')).to.equal(false)
        })
        it('should translate valid commands', function() {
            expect(commands.translate('list')).to.equal("ls -l")
        })
        it('should return empty string for invalid commands', function() {
            expect(commands.translate('fake')).to.equal('')
            expect(commands.translate('')).to.equal('')
        })
    })
})