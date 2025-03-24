import { GaragePage } from '../POM/GaragePage';
import { test } from '../utils/fixtures';
import { expect } from '@playwright/test';

test.describe.serial('Successful car flow', () => {
    let carId;
    test('Create a car using API', async ({ userGaragePage, ApiContext }) => {
        const response = await ApiContext.post('/api/cars', {
            data: 
            { 
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 122 
            }
        })
        const responseBody = await response.json();
        carId = responseBody.data.id;
        await expect(response.status()).toBe(201);
        await expect(responseBody.data).not.toBeUndefined();
        const page = new GaragePage(userGaragePage);
        await page.verifyCarName("Audi TT");
    });

    test('Update a car using API', async ({ userGaragePage, ApiContext }) => {
        const page = new GaragePage(userGaragePage);
        const response = await ApiContext.put(`/api/cars/${carId}`, {
            data: 
            { 
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 123 
            }
        });
        await expect(response.status()).toBe(200);
        await page.verifyUpdateMileageValue("123");
    });

    test('Delete a car using API', async ({ userGaragePage, ApiContext }) => {
        const page = new GaragePage(userGaragePage);
        const response = await ApiContext.delete(`/api/cars/${carId}`);
        await expect(response.status()).toBe(200);
        await page.verifyEmptyPanel();
    });
});

test.describe('Negative car creation cases', () => {
    test('Create a car with non-existing model using API', async ({ApiContext }) => {
        const response = await ApiContext.post('/api/cars', {
            data: 
            { 
                "carBrandId": 1,
                "carModelId": 123,
                "mileage": 122 
            }
        })
        const responseBody = await response.json();
        await expect(response.status()).toBe(404);
        await expect(responseBody).toHaveProperty('message', 'Model not found');
    });

    test('Update a car with less mileage using API', async ({ userGaragePage, ApiContext }) => {
        const page = new GaragePage(userGaragePage);
        const carId = await page.addCar();
        const response = await ApiContext.put(`/api/cars/${carId}`, {
        data: 
        { 
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 1
        }
        });
        await expect(response.status()).toBe(400);
        await page.deleteCar();
        await page.verifyEmptyPanel();
    });

    test('Delete a non-existing car using API', async ({ userGaragePage, ApiContext }) => {
        const page = new GaragePage(userGaragePage);
        const carId = await page.addCar();
        const response = await ApiContext.delete(`/api/cars/${carId}1`);
        await expect(response.status()).toBe(404);
        await page.deleteCar();
        await page.verifyEmptyPanel();
    });
});

test.describe("Mock User Profile", () => {
    test("Mock User Profile", async({userGaragePage}) =>{
        const page = userGaragePage;
        const mockedResponse = {
            status: "ok",
            data: {
                userId: 1,
                photoFilename: "default-user.png",
                name: "John",
                lastName: "Dou"
            }
          };

        await page.route('https://qauto.forstudy.space/api/users/profile', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedResponse)
            });
        });
        await page.getByRole('link', { name: 'Profile' }).click();
        await expect(page.getByText('John Dou')).toBeVisible();
    });

});
