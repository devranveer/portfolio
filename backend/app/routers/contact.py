
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactResponse

router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)


@router.post(
    "/",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED
)
def create_contact_message(
    contact_data: ContactCreate,
    db: Session = Depends(get_db)
):
    contact = Contact(**contact_data.model_dump())

    db.add(contact)
    db.commit()
    db.refresh(contact)

    return contact


@router.get("/", response_model=list[ContactResponse])
def get_contact_messages(db: Session = Depends(get_db)):
    messages = (
        db.query(Contact)
        .order_by(Contact.id.desc())
        .all()
    )
    return messages


@router.get("/{contact_id}", response_model=ContactResponse)
def get_contact_message(
    contact_id: int,
    db: Session = Depends(get_db)
):
    contact = db.query(Contact).filter(
        Contact.id == contact_id
    ).first()

    if contact is None:
        raise HTTPException(
            status_code=404,
            detail="Contact message not found"
        )

    return contact


@router.delete("/{contact_id}")
def delete_contact_message(
    contact_id: int,
    db: Session = Depends(get_db)
):
    contact = db.query(Contact).filter(
        Contact.id == contact_id
    ).first()

    if contact is None:
        raise HTTPException(
            status_code=404,
            detail="Contact message not found"
        )

    db.delete(contact)
    db.commit()

    return {
        "message": "Contact message deleted successfully",
        "id": contact_id
    }
