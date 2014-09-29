/* global describe, it */

(function() {
    'use strict';

    describe('Player', function() {
        beforeEach(function() {
            this.a = new Player();
        });

        it('should exist', function() {
            expect(this.a).to.be.ok;
        });

        describe("Attack", function() {
            it('The player should have have an attack method', function() {
                expect(this.a.attack).to.be.ok;
            });
        });
        describe("Health", function() {
            it('should have a heath of 100', function() {
                expect(this.a.health).to.equal(100);
            });
        });
    });
    describe("Player types - User & Computer", function() {
        beforeEach(function() {
            this.user = new User();
            this.computer = new Computer();
        });
        it("should have 'user' and 'computer' constructors", function() {
            expect(this.user).to.be.ok;
            expect(this.computer).to.be.ok;
        });

        it("Should have a Attack method", function() {
            expect(this.user.attack).to.be.ok;
        });

        describe("Can create a type of User", function() {
            beforeEach(function() {
                this.user1 = new User();
            });
            it("Should exist", function(){
            	expect(this.user1).to.be.ok;
            });
            it("Should have a health of 100", function(){
            	expect(this.user1.health).equal(100);
            });
        });
        describe("Can create a type of Computer", function() {
            beforeEach(function() {
                this.user1 = new Computer();
            });
            it("Should exist", function(){
            	expect(this.user1).to.be.ok;
            });
            it("Should have a health of 100", function(){
            	expect(this.user1.health).equal(100);
            });
        });

    });

})();
