import { Visitor, VisitorType } from './visitor.entity';

describe('Visitor Entity', () => {
  it('should create a visitor instance', () => {
    const visitor = new Visitor();
    visitor.name = 'Jane Doe';
    visitor.phone = '0987654321';
    visitor.company = 'Amazon';
    visitor.type = VisitorType.DELIVERY;

    expect(visitor).toBeDefined();
    expect(visitor.name).toBe('Jane Doe');
    expect(visitor.type).toBe(VisitorType.DELIVERY);
  });
});
