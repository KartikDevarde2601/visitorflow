import { Attachment, AttachmentType } from './attachment.entity';
import { Visit, VisitStatus } from '../../visits/entities/visit.entity';

describe('Attachment Entity', () => {
  it('should create an attachment instance with relationships', () => {
    const visit = new Visit();
    visit.status = VisitStatus.APPROVED;
    visit.purpose = 'Delivery';
    visit.expectedTime = new Date();

    const attachment = new Attachment();
    attachment.type = AttachmentType.SELFIE;
    attachment.url = 'http://minio/bucket/selfie.jpg';
    attachment.bucket = 'visitor-uploads';
    attachment.key = 'selfie.jpg';
    attachment.visit = visit;

    expect(attachment).toBeDefined();
    expect(attachment.type).toBe(AttachmentType.SELFIE);
    expect(attachment.visit).toBe(visit);
    expect(attachment.bucket).toBe('visitor-uploads');
  });
});
