import { Visit, VisitStatus } from './visit.entity';
import { Visitor, VisitorType } from '../../visitors/entities/visitor.entity';
import { User, UserRole } from '../../users/entities/user.entity';

describe('Visit Entity', () => {
  it('should create a visit instance with relationships', () => {
    const visitor = new Visitor();
    visitor.name = 'Jane Doe';
    visitor.phone = '0987654321';
    visitor.type = VisitorType.GUEST;

    const host = new User();
    host.name = 'John Host';
    host.role = UserRole.HOST;

    const visit = new Visit();
    visit.status = VisitStatus.PENDING;
    visit.purpose = 'Meeting';
    visit.expectedTime = new Date();
    visit.visitor = visitor;
    visit.host = host;

    expect(visit).toBeDefined();
    expect(visit.status).toBe(VisitStatus.PENDING);
    expect(visit.visitor.name).toBe('Jane Doe');
    expect(visit.host.name).toBe('John Host');
  });
});
