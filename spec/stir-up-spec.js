describe("basic functions for constructing markup", function() {

	it("should work without adding it's methods to the global namespace", function() {
		var _ = StirUp(['foo', 'bar']);
		expect(window.foo).toBeUndefined();
		expect(_.foo).toBeDefined();
	});

	it("should be able to add markup functions to window object for a nice, neat syntax", function() {
		StirUp(['foo', 'bar'], window);
		expect(window.foo).toBeDefined();
	});

	it("should try and not step on it's own toes", function() {
		StirUp(['el'], window);
		expect(el).toBeDefined();
		expect(_el).toBeDefined();
		
		expect(_el().make()).toBe("<el></el>");
	});
	
	it("should work without or without specifying helper methods", function() {
		StirUp(['foo'], window);
		expect(
			el('foo', 
				el('bar', attr('name', 'thirst'), 'First'),
				el('bar', 'Second'),
				el('bar', 
					el('zip', 'Third')
				)
			).make()).toBe("<foo><bar name=\"thirst\">First</bar><bar>Second</bar><bar><zip>Third</zip></bar></foo>");
	});
	
	it("should support attributes", function() {
		expect(foo(attr('ding', 'dong')).make()).toBe("<foo ding=\"dong\"></foo>");
		expect(foo(attr('ding', 'dong'), attr('top', 'hat')).make()).toBe("<foo ding=\"dong\" top=\"hat\"></foo>");
	});

	it("should support boolean attributes", function() {
		expect(foo(attr('ding')).make()).toBe("<foo ding></foo>");
	});
	
	it("should support iteration", function() {
		var list = ['Ding', 'Dong'];
		expect(
			foo(
				iterate(list, function(e) {
					return bar(e).make();
				})
			).make()
		).toBe("<foo><bar>Ding</bar><bar>Dong</bar></foo>");
	});
	
	it("should allow you to build markup in stages", function() {
		var namespace = {
			elements: ['animals', 'cat', 'dog'],
			attributes: ['sound', 'leash']
		};
		StirUp(namespace, window);
		
		var my_animals = animals();
		
		var benji = dog('Benji');
		benji.set(sound('Woof'));
		benji.set(leash(true));
		
		my_animals.append(benji);
		my_animals.prepend(cat('Garfield'));

		expect(my_animals.make()).toBe("<animals><cat>Garfield</cat><dog sound=\"Woof\" leash=\"true\">Benji</dog></animals>");
	});

	it("should support nested elements", function() {
		expect(
			foo(
				bar(
					foo( 
						bar( 
							foo('Foo') 
						)
					)
				),
				bar('Bar')
			).make()).toBe("<foo><bar><foo><bar><foo>Foo</foo></bar></foo></bar><bar>Bar</bar></foo>");
	});
	
	it("should support basic conditional logic", function() {
		expect(foo( when( true === true, attr('ding'), attr('king', 'kong') ) ).make()).toBe("<foo ding king=\"kong\"></foo>");
		expect(foo( when( 0 > 1, attr('ding'), attr('dong') ), attr('hah') ).make()).toBe("<foo hah></foo>");
		
		expect(
			foo(
				when( 0 > 1, bar('One') ),
				bar('Two')
			).make()).toBe("<foo><bar>Two</bar></foo>");
			
		expect(
			foo(
				when( true, bar('One') ),
				when( true, bar('Two') )
			).make()).toBe("<foo><bar>One</bar><bar>Two</bar></foo>");
			
		expect(
			foo(
				when( false, bar('One') ),
				when( false, bar('Two') )
			).make()).toBe("<foo></foo>");
			
		expect(
			foo(
				bar('One'),
				when( 0 > 1, bar('Two') ),
				bar('Three')
			).make()).toBe("<foo><bar>One</bar><bar>Three</bar></foo>");
			
		expect(
			foo(
				bar('The Dude'),
				when( true === true, bar('Walter') ),
				bar('Donny')
			).make()).toBe("<foo><bar>The Dude</bar><bar>Walter</bar><bar>Donny</bar></foo>");
			
		expect(
			foo(
				bar(
					when(true, 
						foo( 
							bar( 
								foo('Foo') 
							)
						)
					)
				),
				bar('Bar')
			).make()).toBe("<foo><bar><foo><bar><foo>Foo</foo></bar></foo></bar><bar>Bar</bar></foo>");
			
		expect(
			foo(
				bar(
					when(false, 
						foo(
							bar( 
								foo('Foo') 
							)
						)
					)
				),
				bar('Bar')
			).make()).toBe("<foo><bar></bar><bar>Bar</bar></foo>");
	});
});
