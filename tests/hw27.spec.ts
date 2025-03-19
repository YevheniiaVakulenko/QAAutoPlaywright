import { test } from '../utils/fixtures';
import {addCar, deleteCar} from '../utils/commands.spec';
import { expect } from '@playwright/test';

    test('User should see empty garage page', async ({ userGaragePage }) => {
        await expect(userGaragePage.getByText('You don’t have any cars in')).toBeVisible();
    });

    test('User can add a car in garage page', async ({ userGaragePage }) => {
        await addCar(userGaragePage);
        await expect(userGaragePage.getByText('Ford Focus')).toBeVisible();
        await deleteCar(userGaragePage);
    });

    test('User can delete a car in garage page', async ({ userGaragePage }) => {
        await addCar(userGaragePage);
        await deleteCar(userGaragePage);
        await expect(userGaragePage.getByText('You don’t have any cars in')).toBeVisible();
    });

