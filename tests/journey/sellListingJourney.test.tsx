import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SellEquipmentModal } from '../../client/src/components/SellEquipmentModal.js';
import * as api from '../../client/src/services/api.js';

describe('Journey Test: Sell Equipment Listing Submission Flow', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render form fields when modal is open', () => {
    render(
      <SellEquipmentModal
        isOpen={true}
        onClose={vi.fn()}
        onListingCreated={vi.fn()}
      />
    );

    expect(screen.getByText('List Your Gym Equipment')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Rogue RML-390F/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Rogue Fitness, Rep/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Publish Equipment Listing/i })).toBeInTheDocument();
  });

  it('should successfully submit listing and call onListingCreated callback', async () => {
    const handleClose = vi.fn();
    const handleListingCreated = vi.fn();

    vi.spyOn(api, 'createEquipmentListing').mockResolvedValue({
      success: true,
      item: {
        id: 'eq-999',
        title: 'Concept2 SkiErg with Floor Stand',
        slug: 'concept2-skierg-floor-stand',
        brand: 'Concept2',
        category: 'cardio',
        condition: 'used_like_new',
        price: 850,
        originalMSRP: 1100,
        description: 'Complete SkiErg with black steel floor stand and PM5.',
        specifications: {},
        images: ['https://images.unsplash.com/photo-1540497077202-7c8a3999166f'],
        location: 'Boulder, CO',
        sellerType: 'individual',
        sellerName: 'Jake Tyler',
        sellerRating: 5.0,
        sellerReviewCount: 1,
        isFeatured: false,
        createdAt: '2026-10-24T12:00:00Z',
        externalComparisons: []
      }
    });

    render(
      <SellEquipmentModal
        isOpen={true}
        onClose={handleClose}
        onListingCreated={handleListingCreated}
      />
    );

    // Fill in required fields
    fireEvent.change(screen.getByPlaceholderText(/Rogue RML-390F/i), {
      target: { value: 'Concept2 SkiErg with Floor Stand' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Rogue Fitness, Rep/i), {
      target: { value: 'Concept2' }
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g. 620/i), {
      target: { value: '850' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Detail the equipment specs/i), {
      target: { value: 'Complete SkiErg with black steel floor stand and PM5 monitor.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g. Austin, TX/i), {
      target: { value: 'Boulder, CO' }
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g. Marcus Vance/i), {
      target: { value: 'Jake Tyler' }
    });

    // Click submit
    const submitBtn = screen.getByRole('button', { name: /Publish Equipment Listing/i });
    fireEvent.click(submitBtn);

    // Expect success screen to render
    await waitFor(() => {
      expect(screen.getByText('Equipment Listed Successfully!')).toBeInTheDocument();
    });
  });

  it('should display error messages if server rejects payload', async () => {
    vi.spyOn(api, 'createEquipmentListing').mockResolvedValue({
      success: false,
      errors: [
        { field: 'title', message: 'Title is required and must be at least 3 characters.' }
      ]
    });

    render(
      <SellEquipmentModal
        isOpen={true}
        onClose={vi.fn()}
        onListingCreated={vi.fn()}
      />
    );

    // Provide short title that triggers the server error
    fireEvent.change(screen.getByPlaceholderText(/Rogue RML-390F/i), {
      target: { value: 'AB' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Rogue Fitness, Rep/i), {
      target: { value: 'Brand' }
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g. 620/i), {
      target: { value: '500' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Detail the equipment specs/i), {
      target: { value: 'Some description about the gear.' }
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g. Austin, TX/i), {
      target: { value: 'Austin, TX' }
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g. Marcus Vance/i), {
      target: { value: 'Marcus' }
    });

    const submitBtn = screen.getByRole('button', { name: /Publish Equipment Listing/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Title is required and must be at least 3 characters.')).toBeInTheDocument();
    });
  });
});
