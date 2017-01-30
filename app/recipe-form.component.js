"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var fetch_recipe_service_1 = require("./fetch-recipe.service");
var grocery_service_1 = require("./grocery.service");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var RecipeFormComponent = (function () {
    function RecipeFormComponent(recipeService, groceryService) {
        this.recipeService = recipeService;
        this.groceryService = groceryService;
        this.queryString = '';
        this.submitted = false;
        this.addButtonState = false;
        this.addIngredientsButtonState = false;
    }
    RecipeFormComponent.prototype.createRange = function (number) {
        var items = [];
        for (var i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    };
    RecipeFormComponent.prototype.onAddAll = function (ingredients) {
        this.addIngredientsButtonState = true;
        this.groceryService.addIngredients(ingredients).subscribe(function (ingredients) { return console.log(ingredients); });
    };
    RecipeFormComponent.prototype.addIngredientsToRecipe = function (id, res) {
        this.addButtonState = false;
        this.addIngredientsButtonState = false;
        for (var x = 0; x < this.recipes.response.results.length; x++) {
            if (this.recipes.response.results[x].recipe_id == id) {
                this.recipes.response.results[x].ingredients = res;
                console.log(this.recipes.response.results[x]);
            }
        }
    };
    RecipeFormComponent.prototype.onRemove = function (id) {
        for (var x = 0; x < this.recipes.response.results.length; x++) {
            if (this.recipes.response.results[x].recipe_id == id) {
                console.log(this.recipes.response.results[x]);
                this.recipes.response.results.splice(x, 1);
            }
        }
    };
    RecipeFormComponent.prototype.onAdd = function (url, id) {
        var _this = this;
        this.addButtonState = true;
        this.addIngredientsButtonState = false;
        console.log('adding recipe');
        this.recipeService.addRecipe(url).subscribe(function (results) { return _this.addIngredientsToRecipe(id, results); });
    };
    RecipeFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        console.log(this.queryString);
        this.recipeService.getRecipe(this.queryString).subscribe(function (recipes) { return _this.recipes = recipes; });
    };
    return RecipeFormComponent;
}());
RecipeFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'recipe-form',
        templateUrl: './recipe-form.component.html',
        animations: [
            core_1.trigger('enterList', [
                core_1.state('in', core_1.style({ transform: 'translateX(0)' })),
                core_1.transition('void => *', [
                    core_1.style({ transform: 'translateX(-100%)' }),
                    core_1.animate(100)
                ]),
                core_1.transition('* => void', [
                    core_1.animate(100, core_1.style({ transform: 'translateX(100%)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [fetch_recipe_service_1.FetchRecipeService, grocery_service_1.GroceryService])
], RecipeFormComponent);
exports.RecipeFormComponent = RecipeFormComponent;
//# sourceMappingURL=recipe-form.component.js.map